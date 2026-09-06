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
    const observer = new MutationObserver(() => addEditButtons());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function init() {
    if (injected) return;
    injected = true;
    injectModal();
    startObserver();

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

  // Wait for the app to boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 1000);
  }
})();
