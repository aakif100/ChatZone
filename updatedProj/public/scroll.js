window.addEventListener("scroll", () => {
    let scrolled = window.scrollY;
    let finalS = Math.floor(scrolled);
    let scrollable = document.documentElement.scrollHeight - window.innerHeight;

    if(finalS === scrollable){
        // Create custom alert
        const customAlert = document.createElement('div');
        customAlert.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 20px 40px;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            color: white;
            font-family: 'Poppins', sans-serif;
            animation: slideUp 0.5s ease-out, fadeOut 3s ease-in;
            z-index: 1000;
        `;
        
        customAlert.textContent = "You've reached the end of the page";
        document.body.appendChild(customAlert);

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from { transform: translate(-50%, 100%); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
            }
            @keyframes fadeOut {
                0%, 80% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        // Remove alert after animation
        setTimeout(() => {
            customAlert.remove();
            style.remove();
        }, 3000);
    }
});