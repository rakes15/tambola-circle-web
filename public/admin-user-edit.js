/**
 * Injects "Edit Name" buttons into the admin Users table.
 * Works by fetching the user list from the API to build a username→UUID map,
 * then observing DOM mutations to add buttons as rows render.
 */
(function () {
  const API = 'https://api.tambolacircle.com';
  let userMap = {}; // username → { id, first_name, last_name }
  let injected = false;

  function getToken() {
    return localStorage.getItem('authToken');
  }

  async function fetchUserMap() {
    const token = getToken();
    if (!token) return;
    try {
      const resp = await fetch(API + '/admin/users', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await resp.json();
      userMap = {};
      (data.data || []).forEach((u) => {
        userMap[u.user_name] = { id: u.id, first_name: u.first_name || '', last_name: u.last_name || '' };
      });
    } catch (_) {}
  }

  function injectModal() {
    if (document.getElementById('tcEditNameModal')) return;
    const overlay = document.createElement('div');
    overlay.id = 'tcEditNameOverlay';
    overlay.style.cssText =
      'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div id="tcEditNameModal" style="background:#1a2233;border:1px solid #2a3448;border-radius:14px;padding:28px;width:100%;max-width:400px;">
        <h3 style="margin:0 0 20px;color:#e8ecf3;font-size:1.05rem;">Edit User Name</h3>
        <input type="hidden" id="tcEditUserId"/>
        <div style="margin-bottom:14px;">
          <label style="display:block;font-size:0.78rem;font-weight:600;color:#8b96ab;margin-bottom:6px;">First Name *</label>
          <input id="tcEditFirst" placeholder="First name" style="width:100%;padding:10px 12px;background:#0f1420;border:1px solid #2a3448;border-radius:8px;color:#e8ecf3;font-size:0.9rem;box-sizing:border-box;"/>
        </div>
        <div style="margin-bottom:20px;">
          <label style="display:block;font-size:0.78rem;font-weight:600;color:#8b96ab;margin-bottom:6px;">Last Name</label>
          <input id="tcEditLast" placeholder="Last name" style="width:100%;padding:10px 12px;background:#0f1420;border:1px solid #2a3448;border-radius:8px;color:#e8ecf3;font-size:0.9rem;box-sizing:border-box;"/>
        </div>
        <div id="tcEditError" style="color:#ef4444;font-size:0.82rem;min-height:18px;margin-bottom:10px;"></div>
        <div style="display:flex;gap:10px;">
          <button id="tcEditCancel" style="flex:1;padding:11px;background:transparent;border:1px solid #2a3448;border-radius:8px;color:#e8ecf3;cursor:pointer;font-size:0.9rem;font-weight:600;">Cancel</button>
          <button id="tcEditSave" style="flex:1;padding:11px;background:#f97316;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:0.9rem;font-weight:600;">Save Changes</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.getElementById('tcEditCancel').addEventListener('click', closeModal);
    document.getElementById('tcEditSave').addEventListener('click', saveUser);
  }

  function openModal(userId, firstName, lastName) {
    document.getElementById('tcEditUserId').value = userId;
    document.getElementById('tcEditFirst').value = firstName;
    document.getElementById('tcEditLast').value = lastName;
    document.getElementById('tcEditError').textContent = '';
    const overlay = document.getElementById('tcEditNameOverlay');
    overlay.style.display = 'flex';
  }

  function closeModal() {
    document.getElementById('tcEditNameOverlay').style.display = 'none';
  }

  async function saveUser() {
    const id = document.getElementById('tcEditUserId').value;
    const first_name = document.getElementById('tcEditFirst').value.trim();
    const last_name = document.getElementById('tcEditLast').value.trim();
    const errEl = document.getElementById('tcEditError');
    if (!first_name) { errEl.textContent = 'First name is required'; return; }
    const saveBtn = document.getElementById('tcEditSave');
    saveBtn.textContent = 'Saving…';
    saveBtn.disabled = true;
    try {
      const resp = await fetch(`${API}/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + getToken() },
        body: JSON.stringify({ first_name, last_name }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || 'Update failed');
      // Update local map
      const entry = Object.values(userMap).find((u) => u.id === id);
      if (entry) { entry.first_name = first_name; entry.last_name = last_name; }
      closeModal();
      // Update the name in the table row without a full reload
      const nameEl = document.querySelector(`[data-tc-user-id="${id}"]`);
      if (nameEl) nameEl.textContent = `${first_name} ${last_name}`.trim();
    } catch (e) {
      errEl.textContent = e.message || 'Save failed';
    } finally {
      saveBtn.textContent = 'Save Changes';
      saveBtn.disabled = false;
    }
  }

  function addEditButtons() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row) => {
      if (row.dataset.tcEdited) return;
      // Username is in the 3rd td (index 2)
      const tds = row.querySelectorAll('td');
      if (tds.length < 3) return;
      const usernameTd = tds[2];
      const username = usernameTd?.textContent?.trim();
      const userData = userMap[username];
      if (!userData) return;

      row.dataset.tcEdited = '1';
      // Mark the name cell for in-place update
      const namePara = tds[0]?.querySelector('p');
      if (namePara) namePara.setAttribute('data-tc-user-id', userData.id);

      // Add button to Actions column (last td)
      const actionsTd = tds[tds.length - 1];
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit Name';
      editBtn.style.cssText =
        'margin-left:6px;padding:5px 10px;font-size:0.78rem;border-radius:6px;background:transparent;border:1px solid #4b5563;color:#e8ecf3;cursor:pointer;white-space:nowrap;';
      editBtn.addEventListener('mouseenter', () => { editBtn.style.borderColor = '#f97316'; editBtn.style.color = '#f97316'; });
      editBtn.addEventListener('mouseleave', () => { editBtn.style.borderColor = '#4b5563'; editBtn.style.color = '#e8ecf3'; });
      editBtn.addEventListener('click', () => openModal(userData.id, userData.first_name, userData.last_name));
      actionsTd.appendChild(editBtn);
    });
  }

  let observerActive = false;
  function startObserver() {
    if (observerActive) return;
    observerActive = true;
    const observer = new MutationObserver(() => {
      addEditButtons();
      showFabWhenLoggedIn();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function init() {
    if (injected) return;
    injected = true;
    injectModal();
    injectSupportPanel();
    startObserver();
    // Fetch badge count once token is available (retry briefly)
    let attempts = 0;
    const badgePoll = setInterval(() => {
      attempts++;
      if (getToken()) { fetchSupportBadge(); clearInterval(badgePoll); }
      if (attempts > 20) clearInterval(badgePoll);
    }, 500);

    // Re-fetch user map whenever navigating to the Users page
    let lastPath = '';
    setInterval(async () => {
      const path = location.pathname + location.hash;
      if (path !== lastPath) {
        lastPath = path;
        if (path.includes('/users') || path.includes('user')) {
          await fetchUserMap();
          addEditButtons();
        }
      }
    }, 500);

    // Initial fetch if already on users page
    if (location.pathname.includes('/users') || location.hash.includes('user')) {
      await fetchUserMap();
      addEditButtons();
    }
  }

  // ── Support Queries Panel ──────────────────────────────────────────
  let sqTab = 'open';
  let sqBadgeCount = 0;

  function injectSupportPanel() {
    if (document.getElementById('tcSupportOverlay')) return;

    // Floating button — hidden until user is logged in
    const fabWrap = document.createElement('div');
    fabWrap.style.cssText = 'position:fixed;bottom:90px;right:18px;z-index:8000;display:none;';
    fabWrap.innerHTML = `
      <button id="tcSupportFab" title="Support Queries"
        style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#4f46e5);border:none;cursor:pointer;box-shadow:0 4px 18px rgba(124,58,237,0.55);display:flex;align-items:center;justify-content:center;font-size:1.4rem;position:relative;">
        💬
        <span id="tcSupportBadge" style="display:none;position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;border-radius:50%;min-width:18px;height:18px;font-size:0.65rem;font-weight:700;align-items:center;justify-content:center;line-height:1;padding:0 4px;border:2px solid #0f1420;"></span>
      </button>`;
    document.body.appendChild(fabWrap);
    document.getElementById('tcSupportFab').addEventListener('click', openSupportPanel);

    // Modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'tcSupportOverlay';
    overlay.style.cssText =
      'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:9998;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div style="background:#141b2d;border:1px solid #2a3448;border-radius:16px;width:100%;max-width:640px;max-height:80vh;display:flex;flex-direction:column;overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #2a3448;">
          <h3 style="margin:0;color:#e8ecf3;font-size:1rem;">💬 Support Queries</h3>
          <button id="tcSupportClose" style="background:transparent;border:none;color:#8b96ab;font-size:1.3rem;cursor:pointer;">✕</button>
        </div>
        <div style="display:flex;gap:0;border-bottom:1px solid #2a3448;">
          <button id="tcSqTabOpen" onclick="window._tcSqTab('open')" style="flex:1;padding:11px;background:#7c3aed;border:none;color:#fff;font-weight:700;cursor:pointer;font-size:0.85rem;">Open</button>
          <button id="tcSqTabResolved" onclick="window._tcSqTab('resolved')" style="flex:1;padding:11px;background:transparent;border:none;color:#8b96ab;cursor:pointer;font-size:0.85rem;">Resolved</button>
        </div>
        <div id="tcSqList" style="overflow-y:auto;padding:14px 18px;flex:1;min-height:120px;"></div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSupportPanel(); });
    document.getElementById('tcSupportClose').addEventListener('click', closeSupportPanel);

    window._tcSqTab = (tab) => {
      sqTab = tab;
      document.getElementById('tcSqTabOpen').style.background = tab === 'open' ? '#7c3aed' : 'transparent';
      document.getElementById('tcSqTabOpen').style.color = tab === 'open' ? '#fff' : '#8b96ab';
      document.getElementById('tcSqTabResolved').style.background = tab === 'resolved' ? '#7c3aed' : 'transparent';
      document.getElementById('tcSqTabResolved').style.color = tab === 'resolved' ? '#fff' : '#8b96ab';
      loadSupportQueries();
    };
  }

  function openSupportPanel() {
    document.getElementById('tcSupportOverlay').style.display = 'flex';
    sqTab = 'open';
    window._tcSqTab('open');
  }

  function closeSupportPanel() {
    document.getElementById('tcSupportOverlay').style.display = 'none';
  }

  async function loadSupportQueries() {
    const list = document.getElementById('tcSqList');
    list.innerHTML = '<p style="color:#8b96ab;text-align:center;padding:24px 0;">Loading…</p>';
    try {
      const resp = await fetch(`${API}/support/queries?status=${sqTab}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await resp.json();
      const queries = data.data || [];

      if (sqTab === 'open') {
        sqBadgeCount = queries.length;
        updateSupportBadge();
      }

      if (!queries.length) {
        list.innerHTML = `<p style="color:#8b96ab;text-align:center;padding:24px 0;">No ${sqTab} queries.</p>`;
        return;
      }

      list.innerHTML = queries.map((q) => `
        <div style="background:#1a2233;border:1px solid #2a3448;border-radius:10px;padding:14px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div>
              <span style="color:#e8ecf3;font-weight:600;font-size:0.88rem;">${esc(q.name || 'Anonymous')}</span>
              ${q.email ? `<span style="color:#8b96ab;font-size:0.78rem;margin-left:8px;">${esc(q.email)}</span>` : ''}
            </div>
            <span style="background:${q.source==='app'?'#1e40af':'#065f46'};color:#fff;font-size:0.7rem;padding:2px 8px;border-radius:20px;">${q.source}</span>
          </div>
          <p style="color:#c5ccd8;font-size:0.85rem;margin:0 0 10px;white-space:pre-wrap;">${esc(q.message)}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#8b96ab;font-size:0.75rem;">${new Date(q.created_at).toLocaleString('en-IN')}</span>
            ${sqTab === 'open' ? `<button onclick="window._tcResolve('${q.id}')" style="padding:5px 14px;background:transparent;border:1px solid #10b981;border-radius:6px;color:#10b981;font-size:0.78rem;cursor:pointer;font-weight:600;">Resolve</button>` : '<span style="color:#10b981;font-size:0.78rem;">✓ Resolved</span>'}
          </div>
        </div>`).join('');
    } catch (e) {
      list.innerHTML = '<p style="color:#ef4444;text-align:center;padding:24px 0;">Failed to load queries.</p>';
    }
  }

  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  window._tcResolve = async (id) => {
    try {
      const resp = await fetch(`${API}/support/queries/${id}/resolve`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      if (resp.ok) loadSupportQueries();
    } catch (_) {}
  };

  function updateSupportBadge() {
    const badge = document.getElementById('tcSupportBadge');
    if (!badge) return;
    if (sqBadgeCount > 0) {
      badge.textContent = sqBadgeCount;
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  }

  function showFabWhenLoggedIn() {
    const fab = document.getElementById('tcSupportFab');
    if (!fab) return;
    const wrap = fab.parentElement;
    // Hide on login page (login form visible) or when no token
    const onLoginPage = !!document.querySelector('input[type="password"]');
    const visible = !!getToken() && !onLoginPage;
    wrap.style.display = visible ? 'block' : 'none';
  }

  async function fetchSupportBadge() {
    showFabWhenLoggedIn();
    if (!getToken()) return;
    try {
      const resp = await fetch(`${API}/support/queries?status=open`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      const data = await resp.json();
      sqBadgeCount = (data.data || []).length;
      updateSupportBadge();
    } catch (_) {}
  }
  // ── End Support Queries Panel ──────────────────────────────────────

  // Wait for the app to boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 1000);
  }
})();
