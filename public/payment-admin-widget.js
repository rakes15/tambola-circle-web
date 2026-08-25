/**
 * Floating "Payment Requests" widget for the admin dashboard.
 *
 * Injected as a plain script (not part of the React bundle, which has no
 * source available to modify) — it only ever appends sibling nodes to
 * <body>, never touches the React-managed #root subtree, so it can't
 * conflict with React's reconciliation. Scoped to /admin* paths only.
 *
 * Opens the existing standalone payment-admin.html review tool
 * (independent login/session) inside an iframe overlay, and polls the same
 * API for a live pending-count badge once that iframe's admin session
 * (shared localStorage, same origin) exists.
 */
(function () {
	'use strict';
	if (!location.pathname.startsWith('/admin')) return;

	const API_BASE = 'https://api.tambolacircle.com';
	const POLL_INTERVAL_MS = 20000;

	function injectStyles() {
		const style = document.createElement('style');
		style.textContent = `
			#pa-widget-btn {
				position: fixed; bottom: 24px; right: 24px; z-index: 999999;
				width: 60px; height: 60px; border-radius: 50%;
				background: linear-gradient(135deg, #6c5ce7, #a463f2);
				border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(108,92,231,0.5);
				display: flex; align-items: center; justify-content: center;
				font-size: 26px; color: #fff; padding: 0;
			}
			#pa-widget-badge {
				position: absolute; top: -4px; right: -4px; background: #ef4444; color: #fff;
				border-radius: 50%; min-width: 22px; height: 22px; font-size: 12px; font-weight: 700;
				display: none; align-items: center; justify-content: center; padding: 0 4px;
				border: 2px solid #0f1420; box-sizing: border-box;
			}
			#pa-widget-overlay {
				display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 999998;
				align-items: center; justify-content: center; padding: 20px;
			}
			#pa-widget-overlay.open { display: flex; }
			#pa-widget-frame-wrap {
				width: 100%; max-width: 960px; height: 90vh; background: #0f1420;
				border-radius: 16px; overflow: hidden; position: relative;
				box-shadow: 0 10px 60px rgba(0,0,0,0.6);
			}
			#pa-widget-close {
				position: absolute; top: 10px; right: 10px; z-index: 2; background: rgba(255,255,255,0.15);
				border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
				font-size: 16px; line-height: 1;
			}
			#pa-widget-frame { width: 100%; height: 100%; border: none; }
		`;
		document.head.appendChild(style);
	}

	function injectWidget() {
		const btn = document.createElement('button');
		btn.id = 'pa-widget-btn';
		btn.title = 'Payment Requests';
		btn.innerHTML = '💰<span id="pa-widget-badge"></span>';
		document.body.appendChild(btn);

		const overlay = document.createElement('div');
		overlay.id = 'pa-widget-overlay';
		overlay.innerHTML =
			'<div id="pa-widget-frame-wrap">' +
			'<button id="pa-widget-close" title="Close">✕</button>' +
			'<iframe id="pa-widget-frame" src="about:blank"></iframe>' +
			'</div>';
		document.body.appendChild(overlay);

		function openOverlay() {
			overlay.classList.add('open');
			// Reload each time so it reflects the latest list immediately.
			document.getElementById('pa-widget-frame').src = '/payment-admin.html';
		}
		function closeOverlay() {
			overlay.classList.remove('open');
		}

		btn.addEventListener('click', openOverlay);
		document.getElementById('pa-widget-close').addEventListener('click', closeOverlay);
		overlay.addEventListener('click', (e) => {
			if (e.target === overlay) closeOverlay();
		});
	}

	async function pollBadge() {
		const badge = document.getElementById('pa-widget-badge');
		// Same key the main admin dashboard's own login uses (same origin) —
		// reuses that session directly, no separate login for the badge either.
		const token = localStorage.getItem('authToken');
		if (!token) {
			badge.style.display = 'none';
			return;
		}
		try {
			const res = await fetch(API_BASE + '/admin/payment-requests?status=0', {
				headers: { Authorization: 'Bearer ' + token },
			});
			if (!res.ok) {
				badge.style.display = 'none';
				return;
			}
			const data = await res.json();
			const count = (data.data || []).length;
			if (count > 0) {
				badge.textContent = count > 99 ? '99+' : String(count);
				badge.style.display = 'flex';
			} else {
				badge.style.display = 'none';
			}
		} catch (_) {
			badge.style.display = 'none';
		}
	}

	function init() {
		try {
			injectStyles();
			injectWidget();
			pollBadge();
			setInterval(pollBadge, POLL_INTERVAL_MS);
		} catch (err) {
			console.error('[payment-admin-widget] init failed:', err);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
