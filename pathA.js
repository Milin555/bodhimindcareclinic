import fs from 'fs';
import https from 'https';

const pages = [
  { url: 'https://harmonise.framer.website/', output: './index.html' },
  { url: 'https://harmonise.framer.website/about-us', output: './about-us.html' },
  { url: 'https://harmonise.framer.website/services', output: './services.html' }
];

const clientFixScript = `
<script>
(function() {
    const replacements = [
        [/HARMONISE/g, 'BODHI MINDCARE'],
        [/Harmonise/g, 'BODHI MINDCARE'],
        [/© 2025 Harmonise Wellness LLC/g, '© 2026 BODHI MINDCARE. All Rights Reserved.'],
        [/© 2026 Bodhi MindCare Clinic Wellness LLC/g, '© 2026 BODHI MINDCARE. All Rights Reserved.'],
        [/harmonise/g, 'bodhimindcare'],
        [/2025/g, '2026'],
        [/Dr\\. Amy Lin/g, 'Dr. Harvee Shah'],
        [/Dr\\. Min Kim/g, 'Dr. Harvee Shah'],
        [/Amy Lin/g, 'Dr. Harvee Shah'],
        [/Min Kim/g, 'Dr. Harvee Shah'],
        [/Jess Reyes/g, 'Dr. Harvee Shah'],
        [/Anna Burke/g, 'Dr. Harvee Shah'],
        [/David Chen/g, 'Dr. Harvee Shah'],
        [/Dr\\. Lin/g, 'Dr. Harvee Shah'],
        [/Dr\\. Kim/g, 'Dr. Harvee Shah'],
        [/LCSW/g, 'Psychiatrist'],
        [/LMFT/g, 'Psychiatrist'],
        [/248 Pine St/g, '108, Meraki Latitude, Old Padra Rd'],
        [/248 Pine Street Suite 310/g, '108, Meraki Latitude, Old Padra Rd'],
        [/Portland, Oregon/g, 'Vadodara, Gujarat 390007'],
        [/Portland/g, 'Vadodara'],
        [/Oregon/g, 'Gujarat 390007'],
        [/\\+1 234 567 890/g, '079904 69284'],
        [/1234567890/g, '07990469284'],
        [/info@harmonise\\.com/g, 'info@bodhimindcare.clinic'],
        [/info@bodhimindcare\\.com/g, 'info@bodhimindcare.clinic'],
        [/Austin, TX/g, '108, Meraki Latitude, Old Padra Rd, Vadodara, Gujarat 390007'],
        [/changed my life/g, 'Brilliant Doctor and Soothing space...'],
        [/Emily R\\./g, '(Google Review)'],
        [/brought us back together/g, 'Good explanation.. good experience'],
        [/Marcus T\\./g, '(Google Review)'],
        [/Incredibly professional/g, "Dr. Harvee is one of the friendliest human being i've ever encountered."],
        [/Leila O\\./g, '(Google Review)']
    ];

    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            let replaced = false;
            for (const [regex, replacement] of replacements) {
                regex.lastIndex = 0;
                const newText = text.replace(regex, replacement);
                if (newText !== text) {
                    text = newText;
                    replaced = true;
                }
            }
            if (replaced) {
                node.nodeValue = text;
            }
        } else {
            // Fix dynamic links and phone/email targets
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'A') {
                    const href = node.getAttribute('href');
                    if (href) {
                        if (href.includes('harmonise') || href.includes('mailto:info@') || href.includes('1234567890') || href.startsWith('tel:') || href.includes('234')) {
                            if (href.includes('mailto:') || href.includes('info@')) {
                                node.setAttribute('href', 'mailto:info@bodhimindcare.clinic');
                            } else {
                                node.setAttribute('href', 'tel:07990469284');
                            }
                        }
                    }
                }
            }
            for (let child = node.firstChild; child; child = child.nextSibling) {
                replaceText(child);
            }
        }
    }

    function fixVerticalLogos() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.children.length >= 8 && el.children.length <= 15) {
                let combined = '';
                const children = Array.from(el.children);
                children.forEach(c => {
                    if (c.tagName === 'SPAN' || c.tagName === 'DIV') {
                        combined += c.textContent.trim();
                    }
                });
                
                const cleanCombined = combined.toUpperCase().replace(/\s+/g, '');
                if (cleanCombined === 'HARMONISE' || cleanCombined === 'BODHIMINDCARE' || cleanCombined === 'BODHIMINDCARECLINIC') {
                    // Re-render completely letter-by-letter to support clean staggered animations
                    const letters = 'BODHIMINDCARE'.split('');
                    el.innerHTML = '';
                    
                    const style = window.getComputedStyle(el);
                    const isVertical = style.flexDirection === 'column' || el.style.flexDirection === 'column';
                    
                    letters.forEach((letter, idx) => {
                        const span = document.createElement('span');
                        span.textContent = letter;
                        span.style.fontSize = 'inherit';
                        span.style.fontWeight = 'inherit';
                        span.style.fontFamily = 'inherit';
                        span.style.lineHeight = 'inherit';
                        span.style.color = 'inherit';
                        span.style.display = isVertical ? 'block' : 'inline-block';
                        span.style.whiteSpace = 'pre';
                        span.style.opacity = '0';
                        span.style.transform = isVertical ? 'translateY(15px)' : 'translateX(-12px)';
                        span.style.animation = 'rebranded-letter-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                        span.style.animationDelay = (idx * 0.05) + 's';
                        el.appendChild(span);
                    });
                }
            }
        });
    }

    function fixLogos() {
        // 1. Target the main footer logo image (contains flower icon + HARMONISE)
        document.querySelectorAll('img[src*="SYm8ANgCPTjbNCF9T4T8B7rJrg"]').forEach(img => {
            const wrapper = img.closest('div') || img.parentElement;
            if (wrapper) {
                if (wrapper.querySelector('.rebranded-footer-logo')) return;
                
                const logoContainer = document.createElement('div');
                logoContainer.className = 'rebranded-footer-logo';
                logoContainer.style.cssText = 'display:flex;align-items:center;gap:12px;width:auto;height:auto;overflow:visible;';
                
                const icon = document.createElement('img');
                icon.src = 'https://framerusercontent.com/images/oIVmSWGwweFz9I2ap5O2MJmLvfs.png';
                icon.style.cssText = 'width:28px;height:28px;object-fit:contain;flex-shrink:0;';
                
                const text = document.createElement('span');
                text.textContent = 'BODHI MINDCARE';
                text.style.cssText = 'font-family:"Instrument Serif",serif;font-size:20px;font-weight:400;letter-spacing:0.08em;text-transform:uppercase;color:rgb(64,52,39);white-space:nowrap;';
                
                logoContainer.appendChild(icon);
                logoContainer.appendChild(text);
                
                img.style.display = 'none';
                wrapper.appendChild(logoContainer);
            }
        });

        // 2. Target header logo image or other logos
        document.querySelectorAll('img[alt*="logo" i], img[alt*="Harmonise" i], img[alt*="Logo" i]').forEach(img => {
            if (img.src.includes('SYm8ANgCPTjbNCF9T4T8B7rJrg')) return;
            
            const anchor = img.closest('a');
            const logoContainer = img.closest('[data-framer-name="Logo"]') || img.closest('.framer-1yj7opj');
            
            if (anchor && logoContainer) {
                if (anchor.querySelector('.rebranded-logo')) return;
                
                const textEl = document.createElement('span');
                textEl.className = 'rebranded-logo';
                textEl.textContent = 'BODHI MINDCARE';
                textEl.style.cssText = 'font-family:"Instrument Serif",serif;font-size:20px;font-weight:400;letter-spacing:0.08em;text-transform:uppercase;color:rgb(64,52,39);white-space:nowrap;display:flex;align-items:center;';
                
                // Hide all other elements inside the logo anchor (like the "Home" text)
                Array.from(anchor.children).forEach(child => {
                    if (child !== logoContainer) {
                        child.style.display = 'none';
                    }
                });
                
                logoContainer.style.display = 'none';
                anchor.appendChild(textEl);
                
                // Ensure anchor is sized to content and flexes properly
                anchor.style.width = 'auto';
                anchor.style.minWidth = 'none';
                anchor.style.display = 'flex';
                anchor.style.alignItems = 'center';
            } else {
                // Fallback wrapper replacement if no anchor or logo container structure
                const wrapper = img.closest('div') || img.parentElement;
                if (wrapper && !wrapper.querySelector('.rebranded-logo')) {
                    const textEl = document.createElement('span');
                    textEl.className = 'rebranded-logo';
                    textEl.textContent = 'BODHI MINDCARE';
                    textEl.style.cssText = 'font-family:"Instrument Serif",serif;font-size:20px;font-weight:400;letter-spacing:0.08em;text-transform:uppercase;color:rgb(64,52,39);white-space:nowrap;display:flex;align-items:center;';
                    img.style.display = 'none';
                    wrapper.appendChild(textEl);
                    wrapper.style.width = '220px';
                    wrapper.style.minWidth = '220px';
                    wrapper.style.flexShrink = '0';
                    wrapper.style.overflow = 'visible';
                }
            }
        });

        // 3. Swap the dropdown menu card image containing "HARMONISE" text with a clean one
        document.querySelectorAll('img').forEach(img => {
            const src = img.src || '';
            const srcset = img.getAttribute('srcset') || '';
            const targets = ['3by2qt8OrZYZ5sDPcRi7wX26Ss', 'aU0IbdXtPpgjWK9p6Eg09jLPoM', 'PPMFigWO6hp90EsiIQwzZLVGtoY'];
            if (targets.some(target => src.includes(target) || srcset.includes(target))) {
                img.src = 'https://framerusercontent.com/images/2zSBYRPVYM7MXJV8p1FsGGmcE.jpg';
                img.setAttribute('srcset', 'https://framerusercontent.com/images/2zSBYRPVYM7MXJV8p1FsGGmcE.jpg?width=2500&height=2074 2500w');
            }
        });
    }

    // Inject CSS for custom animations, logo wrapper fixes, and the modern booking modal
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes rebranded-letter-fade-in {
            from { opacity: 0; transform: translateX(-12px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes rebranded-letter-fade-in-vertical {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .rebranded-logo {
            font-family: "Instrument Serif", serif !important;
            font-size: 18px !important;
            letter-spacing: 0.08em !important;
            white-space: nowrap !important;
            display: inline-block !important;
            width: max-content !important;
            min-width: 220px !important;
            margin-right: 40px !important;
            font-weight: 400 !important;
            color: rgb(64,52,39) !important;
        }
        @media (max-width: 810px) {
            .rebranded-logo {
                font-size: 15px !important;
                min-width: 0 !important;
                margin-right: 10px !important;
            }
        }
        header, nav {
            display: flex !important;
            align-items: center !important;
        }
        a:has(> .rebranded-logo),
        div:has(> a > .rebranded-logo) {
            width: auto !important;
            height: auto !important;
            max-width: none !important;
            max-height: none !important;
            aspect-ratio: auto !important;
            overflow: visible !important;
        }
        a:has(> .rebranded-logo):after,
        div:has(> a > .rebranded-logo):after {
            display: none !important;
            content: none !important;
            border: none !important;
        }
        [style*="opacity: 0.001"], 
        [style*="opacity:0.001"],
        [style*="opacity: 0.01"],
        [style*="opacity:0.01"],
        [data-framer-appear-id] {
            opacity: 1 !important;
            transform: none !important;
        }
        div:has(> .rebranded-footer-logo),
        div:has(> div > .rebranded-footer-logo) {
            width: auto !important;
            height: auto !important;
            overflow: visible !important;
        }

        /* Hide Framer watermark and template buttons */
        #__framer-badge-container,
        .__framer-badge,
        .framer-7c208x-container,
        #template-overlay {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* Booking Modal Styling */
        #bodhi-booking-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(64, 52, 39, 0.45);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            font-family: 'Inter', sans-serif;
        }
        #bodhi-booking-modal.active {
            opacity: 1;
            pointer-events: auto;
        }
        .booking-modal-card {
            background: #feffee;
            border: 1px solid rgba(64, 52, 39, 0.15);
            border-radius: 24px;
            width: 90%;
            max-width: 660px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            box-shadow: 0 25px 50px -12px rgba(64, 52, 39, 0.25);
            transform: translateY(24px);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            color: #403427;
        }
        #bodhi-booking-modal.active .booking-modal-card {
            transform: translateY(0);
        }
        .booking-modal-header {
            padding: 24px 32px;
            border-bottom: 1px solid rgba(64, 52, 39, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .booking-modal-header h2 {
            font-family: 'Instrument Serif', serif;
            font-size: 30px;
            font-weight: 400;
            margin: 0;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .booking-modal-close {
            background: none;
            border: none;
            font-size: 32px;
            cursor: pointer;
            color: #403427;
            opacity: 0.5;
            transition: opacity 0.2s;
            line-height: 1;
            padding: 4px;
        }
        .booking-modal-close:hover {
            opacity: 1;
        }
        .booking-modal-body {
            padding: 32px;
            flex-grow: 1;
            overflow-y: auto;
        }
        .booking-step {
            display: none;
        }
        .booking-step.active {
            display: block;
            animation: fadeInStep 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInStep {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .booking-progress {
            display: flex;
            gap: 8px;
            margin-bottom: 24px;
        }
        .progress-bar {
            height: 4px;
            flex-grow: 1;
            background: rgba(64, 52, 39, 0.1);
            border-radius: 2px;
            transition: background-color 0.3s;
        }
        .progress-bar.active {
            background: #403427;
        }
        .services-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .service-option {
            border: 1px solid rgba(64, 52, 39, 0.12);
            border-radius: 16px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #efe9d5;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .service-option:hover {
            border-color: #403427;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(64, 52, 39, 0.06);
        }
        .service-option.selected {
            background: #403427;
            color: #feffee;
            border-color: #403427;
        }
        .service-details h3 {
            margin: 0 0 6px 0;
            font-size: 16px;
            font-weight: 600;
        }
        .service-details p {
            margin: 0;
            font-size: 13px;
            opacity: 0.8;
        }
        .service-price {
            font-family: 'Instrument Serif', serif;
            font-size: 26px;
            font-weight: 400;
        }
        .datetime-container {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 24px;
        }
        .calendar-wrapper {
            background: #efe9d5;
            border-radius: 16px;
            padding: 20px;
        }
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .calendar-header span {
            font-weight: 600;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .calendar-nav-btn {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 20px;
            color: #403427;
            padding: 4px 10px;
            border-radius: 50%;
            transition: background-color 0.2s;
        }
        .calendar-nav-btn:hover {
            background: rgba(64, 52, 39, 0.08);
        }
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 8px;
            text-align: center;
        }
        .calendar-day-name {
            font-size: 12px;
            font-weight: 700;
            opacity: 0.5;
            padding-bottom: 8px;
        }
        .calendar-day {
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
            font-weight: 500;
        }
        .calendar-day:hover:not(.disabled):not(.selected) {
            background: rgba(64, 52, 39, 0.1);
        }
        .calendar-day.selected {
            background: #403427;
            color: #feffee;
            font-weight: 700;
        }
        .calendar-day.disabled {
            opacity: 0.2;
            cursor: not-allowed;
        }
        .slots-wrapper {
            display: flex;
            flex-direction: column;
        }
        .slots-header {
            font-weight: 700;
            margin-bottom: 16px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.8;
        }
        .slots-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            max-height: 250px;
            overflow-y: auto;
            padding-right: 4px;
        }
        .time-slot {
            border: 1px solid rgba(64, 52, 39, 0.12);
            background: #efe9d5;
            padding: 12px;
            border-radius: 10px;
            text-align: center;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s;
        }
        .time-slot:hover {
            border-color: #403427;
            background: rgba(64, 52, 39, 0.05);
        }
        .time-slot.selected {
            background: #403427;
            color: #feffee;
            border-color: #403427;
        }
        .booking-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .form-group label {
            font-size: 13px;
            font-weight: 600;
            opacity: 0.85;
        }
        .form-group input, .form-group textarea {
            border: 1px solid rgba(64, 52, 39, 0.15);
            border-radius: 10px;
            padding: 12px 16px;
            background: #efe9d5;
            font-size: 14px;
            color: #403427;
            outline: none;
            font-family: inherit;
            transition: border-color 0.2s;
        }
        .form-group input:focus, .form-group textarea:focus {
            border-color: #403427;
        }
        .booking-modal-footer {
            padding: 24px 32px;
            border-top: 1px solid rgba(64, 52, 39, 0.08);
            display: flex;
            justify-content: space-between;
        }
        .btn-primary {
            background: #403427;
            color: #feffee;
            border: none;
            border-radius: 30px;
            padding: 12px 32px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(64, 52, 39, 0.2);
        }
        .btn-primary:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        .btn-secondary {
            background: none;
            border: 1px solid rgba(64, 52, 39, 0.2);
            color: #403427;
            border-radius: 30px;
            padding: 12px 32px;
            font-weight: 600;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background: rgba(64, 52, 39, 0.05);
        }
        .success-screen {
            text-align: center;
            padding: 20px 0;
        }
        .success-icon-wrapper {
            width: 72px;
            height: 72px;
            background: #efe9d5;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 20px;
        }
        .success-icon {
            font-size: 32px;
            color: #403427;
        }
        .success-screen h3 {
            font-family: 'Instrument Serif', serif;
            font-size: 34px;
            font-weight: 400;
            margin: 0 0 10px 0;
            letter-spacing: 0.02em;
            text-transform: uppercase;
        }
        .success-summary {
            background: #efe9d5;
            border-radius: 16px;
            padding: 20px;
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            text-align: left;
            font-size: 13px;
        }
        .success-summary-item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(64, 52, 39, 0.06);
            padding-bottom: 8px;
        }
        .success-summary-item:last-child {
            border: none;
            padding: 0;
        }
        .success-summary-label {
            opacity: 0.6;
            font-weight: 500;
        }
        .success-summary-value {
            font-weight: 650;
        }

        /* Custom Mobile Menu Styling */
        #bodhi-mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(240, 234, 213, 0.96);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            z-index: 99998;
            display: flex;
            flex-direction: column;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            font-family: 'Inter', sans-serif;
            padding: 24px 32px;
            box-sizing: border-box;
        }
        #bodhi-mobile-menu.active {
            opacity: 1;
            pointer-events: auto;
        }
        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 60px;
        }
        .mobile-menu-close {
            background: none;
            border: none;
            font-size: 38px;
            color: #403427;
            cursor: pointer;
            line-height: 1;
            padding: 4px;
        }
        .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 28px;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            padding-bottom: 80px;
        }
        .mobile-menu-link {
            font-family: 'Instrument Serif', serif;
            font-size: 36px;
            color: #403427;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            transition: opacity 0.2s;
        }
        .mobile-menu-link:hover {
            opacity: 0.7;
        }
        .mobile-menu-link.book-btn {
            font-family: 'Inter', sans-serif;
            font-size: 15px;
            font-weight: 650;
            background: #403427;
            color: #feffee;
            padding: 14px 36px;
            border-radius: 30px;
            margin-top: 12px;
            letter-spacing: normal;
            text-transform: none;
            box-shadow: 0 6px 16px rgba(64, 52, 39, 0.15);
        }

        @media (max-width: 600px) {
            .booking-modal-card {
                width: 95% !important;
                max-height: 95vh !important;
                border-radius: 16px !important;
            }
            .booking-modal-header {
                padding: 16px 20px !important;
            }
            .booking-modal-header h2 {
                font-size: 24px !important;
            }
            .booking-modal-body {
                padding: 20px 16px !important;
            }
            .booking-modal-footer {
                padding: 16px 20px !important;
            }
            .datetime-container {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
            }
            .calendar-wrapper {
                padding: 12px !important;
            }
            .calendar-grid {
                gap: 4px !important;
            }
            .calendar-day {
                font-size: 12px !important;
            }
            .service-option {
                padding: 14px !important;
            }
            .service-details h3 {
                font-size: 14px !important;
            }
            .service-details p {
                font-size: 11px !important;
            }
            .service-price {
                font-size: 20px !important;
            }
        }
    \`;
    document.head.appendChild(style);

    // Inject Booking Modal HTML
    const modalHtml = \`
    <div id="bodhi-booking-modal">
        <div class="booking-modal-card">
            <div class="booking-modal-header">
                <h2>Request a Session</h2>
                <button class="booking-modal-close">&times;</button>
            </div>
            <div class="booking-modal-body">
                <div class="booking-progress">
                    <div class="progress-bar active" data-step="1"></div>
                    <div class="progress-bar" data-step="2"></div>
                    <div class="progress-bar" data-step="3"></div>
                </div>

                <!-- Step 1: Services -->
                <div class="booking-step active" data-step="1">
                    <p style="margin-top:0;margin-bottom:20px;font-size:14px;line-height:1.5;opacity:0.85;">Select the type of care you are looking for:</p>
                    <div class="services-list">
                        <div class="service-option" data-service="Anxiety & Trauma EMDR Therapy" data-duration="60" data-price="$180">
                            <div class="service-details">
                                <h3>Anxiety & Trauma EMDR Therapy</h3>
                                <p>Specialized integrative trauma and anxiety therapy session (60 mins)</p>
                            </div>
                            <div class="service-price">$180</div>
                        </div>
                        <div class="service-option" data-service="Psychiatrist Consultation" data-duration="45" data-price="$220">
                            <div class="service-details">
                                <h3>Psychiatrist Consultation</h3>
                                <p>Comprehensive mental health assessment and diagnosis (45 mins)</p>
                            </div>
                            <div class="service-price">$220</div>
                        </div>
                        <div class="service-option" data-service="Individual Wellness Counseling" data-duration="50" data-price="$150">
                            <div class="service-details">
                                <h3>Individual Wellness Counseling</h3>
                                <p>Supportive psychotherapeutic counseling for general wellness (50 mins)</p>
                            </div>
                            <div class="service-price">$150</div>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Date & Time -->
                <div class="booking-step" data-step="2">
                    <p style="margin-top:0;margin-bottom:20px;font-size:14px;line-height:1.5;opacity:0.85;">Select your preferred date and available time slot:</p>
                    <div class="datetime-container">
                        <div class="calendar-wrapper">
                            <div class="calendar-header">
                                <button class="calendar-nav-btn" id="cal-prev">&lsaquo;</button>
                                <span id="cal-month-year"></span>
                                <button class="calendar-nav-btn" id="cal-next">&rsaquo;</button>
                            </div>
                            <div class="calendar-grid" id="calendar-grid">
                                <!-- Calendar days populated by JS -->
                            </div>
                        </div>
                        <div class="slots-wrapper">
                            <div class="slots-header">Available Slots</div>
                            <div class="slots-grid" id="slots-grid">
                                <!-- Slots populated dynamically -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Patient Info -->
                <div class="booking-step" data-step="3">
                    <p style="margin-top:0;margin-bottom:20px;font-size:14px;line-height:1.5;opacity:0.85;">Provide your contact information to request the appointment:</p>
                    <form class="booking-form" id="booking-form" onsubmit="event.preventDefault();">
                        <div class="form-group">
                            <label for="booking-name">Full Name</label>
                            <input type="text" id="booking-name" required placeholder="Your Name">
                        </div>
                        <div class="form-group">
                            <label for="booking-email">Email Address</label>
                            <input type="email" id="booking-email" required placeholder="your.email@example.com">
                        </div>
                        <div class="form-group">
                            <label for="booking-phone">Phone Number</label>
                            <input type="tel" id="booking-phone" required placeholder="079904 69284">
                        </div>
                        <div class="form-group">
                            <label for="booking-notes">Additional Notes (Optional)</label>
                            <textarea id="booking-notes" rows="3" placeholder="Briefly describe what you'd like to address..."></textarea>
                        </div>
                    </form>
                </div>

                <!-- Step 4: Success Screen -->
                <div class="booking-step" data-step="4">
                    <div class="success-screen">
                        <div class="success-icon-wrapper">
                            <span class="success-icon">✓</span>
                        </div>
                        <h3>Request Submitted!</h3>
                        <p style="font-size:14px;line-height:1.5;margin:0 0 20px 0;opacity:0.85;">We have received your request. Dr. Harvee Shah will reach out to you shortly to confirm your booking details.</p>
                        <div class="success-summary">
                            <div class="success-summary-item">
                                <span class="success-summary-label">Service:</span>
                                <span class="success-summary-value" id="summary-service">-</span>
                            </div>
                            <div class="success-summary-item">
                                <span class="success-summary-label">Date & Time:</span>
                                <span class="success-summary-value" id="summary-datetime">-</span>
                            </div>
                            <div class="success-summary-item">
                                <span class="success-summary-label">Patient:</span>
                                <span class="success-summary-value" id="summary-name">-</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="booking-modal-footer">
                <button class="btn-secondary" id="btn-back" style="visibility: hidden;">Back</button>
                <button class="btn-primary" id="btn-next" disabled>Next</button>
            </div>
        </div>
    </div>
    \`;

    const modalRoot = document.createElement('div');
    modalRoot.id = 'bodhi-booking-modal-root';
    modalRoot.innerHTML = modalHtml;
    document.body.appendChild(modalRoot);

    // Inject Custom Mobile Menu HTML
    const mobileMenuHtml = \`
    <div id="bodhi-mobile-menu">
        <div class="mobile-menu-header">
            <span class="rebranded-logo" style="font-size:22px !important; min-width:0 !important; margin:0 !important;">Bodhi Mindcare</span>
            <button class="mobile-menu-close">&times;</button>
        </div>
        <div class="mobile-menu-links">
            <a href="./" class="mobile-menu-link">Home</a>
            <a href="./about-us.html" class="mobile-menu-link">About</a>
            <a href="./services.html" class="mobile-menu-link">Services</a>
            <a href="./contact-us.html" class="mobile-menu-link book-btn">Book a session</a>
        </div>
    </div>
    \`;

    const mobileMenuRoot = document.createElement('div');
    mobileMenuRoot.id = 'bodhi-mobile-menu-root';
    mobileMenuRoot.innerHTML = mobileMenuHtml;
    document.body.appendChild(mobileMenuRoot);

    const mobileMenu = document.getElementById('bodhi-mobile-menu');
    const closeMenuBtn = mobileMenu.querySelector('.mobile-menu-close');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
    }

    closeMenuBtn.addEventListener('click', closeMobileMenu);

    // Helper to identify the hamburger icon SVG
    function isHamburgerSvg(svg) {
        if (!svg || svg.tagName.toLowerCase() !== 'svg') return false;
        const viewBox = svg.getAttribute('viewBox');
        const html = svg.innerHTML || '';
        return (
            viewBox === '0 0 18 14' || 
            svg.querySelector('use[href*="svg845177526"]') ||
            svg.querySelector('use[*|href*="svg845177526"]') ||
            html.includes('svg845177526')
        );
    }

    // Mobile menu toggle interceptor
    document.addEventListener('click', (e) => {
        let isHamburgerClick = false;
        const target = e.target;
        
        // 1. Direct click on SVG or inside SVG
        const svg = target.closest('svg');
        if (svg) {
            if (isHamburgerSvg(svg)) {
                isHamburgerClick = true;
            }
        } else {
            // 2. Click on the container wrapper of the SVG (up to 2 levels up)
            const childSvg = target.querySelector('svg');
            if (childSvg && isHamburgerSvg(childSvg)) {
                isHamburgerClick = true;
            }
        }
        
        if (isHamburgerClick) {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        }
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('book-btn') || link.getAttribute('href').includes('contact-us')) {
                e.preventDefault();
                closeMobileMenu();
                openBookingModal();
            } else {
                closeMobileMenu();
            }
        });
    });

    // Booking modal controller variables
    const modal = document.getElementById('bodhi-booking-modal');
    const closeBtn = modal.querySelector('.booking-modal-close');
    const nextBtn = document.getElementById('btn-next');
    const backBtn = document.getElementById('btn-back');
    const steps = modal.querySelectorAll('.booking-step');
    const progressBars = modal.querySelectorAll('.progress-bar');
    
    let currentStep = 1;
    let selectedService = '';
    let selectedPrice = '';
    let selectedDate = null;
    let selectedSlot = '';

    // Click handler for intercepting Book a Session links
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (anchor) {
            const href = anchor.getAttribute('href') || '';
            const text = anchor.textContent || '';
            if (href.includes('contact-us') || text.toLowerCase().includes('book a session')) {
                e.preventDefault();
                openBookingModal();
            }
        }
    });

    function openBookingModal() {
        modal.classList.add('active');
        modal.querySelector('.booking-modal-footer').style.display = 'flex';
        goToStep(1);
    }

    function closeBookingModal() {
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeBookingModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeBookingModal();
    });

    // Handle service card selection
    const serviceOptions = modal.querySelectorAll('.service-option');
    serviceOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            serviceOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedService = opt.getAttribute('data-service');
            selectedPrice = opt.getAttribute('data-price');
            nextBtn.disabled = false;
        });
    });

    function goToStep(stepNum) {
        currentStep = stepNum;
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNum) {
                step.classList.add('active');
            }
        });

        progressBars.forEach(bar => {
            const barStep = parseInt(bar.getAttribute('data-step'));
            if (barStep <= stepNum) {
                bar.classList.add('active');
            } else {
                bar.classList.remove('active');
            }
        });

        if (stepNum === 1) {
            backBtn.style.visibility = 'hidden';
            nextBtn.textContent = 'Next';
            nextBtn.disabled = !selectedService;
        } else if (stepNum === 2) {
            backBtn.style.visibility = 'visible';
            nextBtn.textContent = 'Next';
            nextBtn.disabled = !(selectedDate && selectedSlot);
            renderCalendar();
            renderSlots();
        } else if (stepNum === 3) {
            backBtn.style.visibility = 'visible';
            nextBtn.textContent = 'Request Booking';
            validateStep3Form();
        } else if (stepNum === 4) {
            modal.querySelector('.booking-modal-footer').style.display = 'none';
            document.getElementById('summary-service').textContent = selectedService;
            const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            document.getElementById('summary-datetime').textContent = dateStr + ' at ' + selectedSlot;
            document.getElementById('summary-name').textContent = document.getElementById('booking-name').value;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentStep < 3) {
            goToStep(currentStep + 1);
        } else if (currentStep === 3) {
            const form = document.getElementById('booking-form');
            if (form.reportValidity()) {
                goToStep(4);
            }
        }
    });

    backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });

    // Calendar rendering engine
    let calDate = new Date();
    const monthYearSpan = document.getElementById('cal-month-year');
    const calendarGrid = document.getElementById('calendar-grid');

    document.getElementById('cal-prev').addEventListener('click', () => {
        calDate.setMonth(calDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('cal-next').addEventListener('click', () => {
        calDate.setMonth(calDate.getMonth() + 1);
        renderCalendar();
    });

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = calDate.getFullYear();
        const month = calDate.getMonth();

        monthYearSpan.textContent = calDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        dayNames.forEach(name => {
            const el = document.createElement('div');
            el.className = 'calendar-day-name';
            el.textContent = name;
            calendarGrid.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0,0,0,0);

        for (let i = 0; i < firstDay; i++) {
            const el = document.createElement('div');
            calendarGrid.appendChild(el);
        }

        for (let day = 1; day <= totalDays; day++) {
            const el = document.createElement('div');
            el.className = 'calendar-day';
            el.textContent = day;

            const thisDate = new Date(year, month, day);
            if (thisDate < today || thisDate.getDay() === 0 || thisDate.getDay() === 6) {
                el.classList.add('disabled');
            } else {
                if (selectedDate && selectedDate.toDateString() === thisDate.toDateString()) {
                    el.classList.add('selected');
                }

                el.addEventListener('click', () => {
                    selectedDate = thisDate;
                    renderCalendar();
                    renderSlots();
                    nextBtn.disabled = !(selectedDate && selectedSlot);
                });
            }
            calendarGrid.appendChild(el);
        }
    }

    // Slots rendering engine
    function renderSlots() {
        const slotsGrid = document.getElementById('slots-grid');
        slotsGrid.innerHTML = '';
        
        if (!selectedDate) {
            slotsGrid.innerHTML = '<div style="opacity: 0.6; font-size:12px; text-align:center; padding: 20px 0;">Please select a date</div>';
            return;
        }

        const times = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
        times.forEach(time => {
            const el = document.createElement('div');
            el.className = 'time-slot';
            el.textContent = time;

            if (selectedSlot === time) {
                el.classList.add('selected');
            }

            el.addEventListener('click', () => {
                const slots = slotsGrid.querySelectorAll('.time-slot');
                slots.forEach(s => s.classList.remove('selected'));
                el.classList.add('selected');
                selectedSlot = time;
                nextBtn.disabled = !(selectedDate && selectedSlot);
            });
            slotsGrid.appendChild(el);
        });
    }

    function validateStep3Form() {
        const form = document.getElementById('booking-form');
        const inputs = form.querySelectorAll('input[required]');
        
        function checkValidity() {
            let allValid = true;
            inputs.forEach(input => {
                if (!input.value.trim() || !input.checkValidity()) {
                    allValid = false;
                }
            });
            nextBtn.disabled = !allValid;
        }

        inputs.forEach(input => {
            input.addEventListener('input', checkValidity);
        });
        checkValidity();
    }

    function removeWatermarks() {
        const badges = document.querySelectorAll('[id*="badge"], [class*="badge"], [class*="framer-badge"]');
        badges.forEach(b => {
            b.style.setProperty('display', 'none', 'important');
            b.style.setProperty('visibility', 'hidden', 'important');
            b.style.setProperty('opacity', '0', 'important');
            b.style.setProperty('pointer-events', 'none', 'important');
        });

        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.children.length === 0 && el.textContent.trim() === 'Get Template') {
                let parent = el;
                for (let i = 0; i < 6; i++) {
                    if (parent && parent !== document.body) {
                        const style = window.getComputedStyle(parent);
                        if (style.position === 'fixed' || parent.className.includes('-container') || parent.id.includes('overlay')) {
                            parent.style.setProperty('display', 'none', 'important');
                            parent.style.setProperty('visibility', 'hidden', 'important');
                            parent.style.setProperty('opacity', '0', 'important');
                            parent.style.setProperty('pointer-events', 'none', 'important');
                            break;
                        }
                        parent = parent.parentElement;
                    }
                }
            }
        });
    }

    // Set up MutationObserver to intercept changes in DOM
    const observer = new MutationObserver((mutations) => {
        observer.disconnect();

        let needsLogoFix = false;
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    replaceText(node);
                    needsLogoFix = true;
                });
            } else if (mutation.type === 'characterData') {
                replaceText(mutation.target);
                needsLogoFix = true;
            } else if (mutation.type === 'attributes') {
                if (mutation.target.tagName === 'IMG') {
                    needsLogoFix = true;
                }
            }
        }
        if (needsLogoFix) {
            fixVerticalLogos();
            fixLogos();
        }
        removeWatermarks();

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: ['src', 'srcset']
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['src', 'srcset']
    });

    document.addEventListener("DOMContentLoaded", () => {
        replaceText(document.body);
        fixVerticalLogos();
        fixLogos();
        removeWatermarks();
    });
    window.addEventListener("load", () => {
        replaceText(document.body);
        fixVerticalLogos();
        fixLogos();
        removeWatermarks();
    });
})();
</script>
</body>
`;

function processPage(pageUrl, outputPath) {
  return new Promise((resolve, reject) => {
    https.get(pageUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        let html = data;
        
        // 1. Static string replacements in HTML source
        html = html.replace(/HARMONISE/g, 'BODHI MINDCARE');
        html = html.replace(/Harmonise/g, 'BODHI MINDCARE');
        html = html.replace(/© 2025 Harmonise Wellness LLC/g, '© 2026 BODHI MINDCARE. All Rights Reserved.');
        html = html.replace(/© 2026 Bodhi MindCare Clinic Wellness LLC/g, '© 2026 BODHI MINDCARE. All Rights Reserved.');
        html = html.replace(/harmonise/g, 'bodhimindcare');
        html = html.replace(/2025/g, '2026');
        html = html.replace(/info@harmonise\.com/g, 'info@bodhimindcare.clinic');
        html = html.replace(/info@bodhimindcare\.com/g, 'info@bodhimindcare.clinic');
        html = html.replace(/mailto:info@harmonise\.com/g, 'mailto:info@bodhimindcare.clinic');
        html = html.replace(/mailto:info@bodhimindcare\.com/g, 'mailto:info@bodhimindcare.clinic');
        
        html = html.replace(/Dr\. Amy Lin/g, 'Dr. Harvee Shah');
        html = html.replace(/Dr\. Min Kim/g, 'Dr. Harvee Shah');
        html = html.replace(/Amy Lin/g, 'Dr. Harvee Shah');
        html = html.replace(/Min Kim/g, 'Dr. Harvee Shah');
        html = html.replace(/Jess Reyes/g, 'Dr. Harvee Shah');
        html = html.replace(/Anna Burke/g, 'Dr. Harvee Shah');
        html = html.replace(/David Chen/g, 'Dr. Harvee Shah');
        html = html.replace(/Dr\. Lin/g, 'Dr. Harvee Shah');
        html = html.replace(/Dr\. Kim/g, 'Dr. Harvee Shah');
        
        html = html.replace(/248 Pine St/g, '108, Meraki Latitude, Old Padra Rd');
        html = html.replace(/248 Pine Street Suite 310/g, '108, Meraki Latitude, Old Padra Rd');
        html = html.replace(/Portland, Oregon/g, 'Vadodara, Gujarat 390007');
        html = html.replace(/Portland/g, 'Vadodara');
        html = html.replace(/Oregon/g, 'Gujarat 390007');
        html = html.replace(/\+1 234 567 890/g, '079904 69284');
        html = html.replace(/1234567890/g, '07990469284');

        // Rewrite relative/absolute navigation links to local HTML files
        html = html.replace(/href="\.\/about-us"/g, 'href="./about-us.html"');
        html = html.replace(/href="\/about-us"/g, 'href="./about-us.html"');
        html = html.replace(/href="https:\/\/harmonise\.framer\.website\/about-us"/g, 'href="./about-us.html"');

        html = html.replace(/href="\.\/services"/g, 'href="./services.html"');
        html = html.replace(/href="\/services"/g, 'href="./services.html"');
        html = html.replace(/href="https:\/\/harmonise\.framer\.website\/services"/g, 'href="./services.html"');

        html = html.replace(/href="\.\/contact-us"/g, 'href="./contact-us.html"');
        html = html.replace(/href="\/contact-us"/g, 'href="./contact-us.html"');
        html = html.replace(/href="https:\/\/harmonise\.framer\.website\/contact-us"/g, 'href="./contact-us.html"');

        // Inject clientFixScript
        html = html.replace('</body>', clientFixScript);
        
        fs.writeFileSync(outputPath, html);
        console.log(`Successfully processed and output: ${outputPath}`);
        resolve();
      });
    }).on('error', (e) => {
      console.error(`Download failed for ${pageUrl}:`, e.message);
      reject(e);
    });
  });
}

// Process all pages sequentially
async function run() {
  for (const page of pages) {
    try {
      await processPage(page.url, page.output);
    } catch (err) {
      console.error(`Failed to process page: ${page.url}`, err);
    }
  }
  console.log("All pages successfully built!");
}

run();
