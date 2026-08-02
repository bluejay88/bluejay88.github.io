function consoleText(words, id, colors, callback) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.setAttribute('style', 'color:' + colors[0]);
  
    // Track if animation is complete
    var totalWords = words.length;
    var currentWordIndex = 0;
  
    // Skip button handling
    var skipButton = document.getElementById('skipButton');
    var skipTimeout = setTimeout(function() {
        skipButton.style.display = 'block'; // Show the button after 3 seconds
    }, 3000);
  
    function animateText() {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[currentWordIndex].substring(0, letterCount);
            window.setTimeout(function() {
                var usedColor = colors.shift();
                colors.push(usedColor);
                currentWordIndex = (currentWordIndex + 1) % totalWords;
                x = 1;
                target.setAttribute('style', 'color:' + colors[0]);
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (letterCount === words[currentWordIndex].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (waiting === false) {
            target.innerHTML = words[currentWordIndex].substring(0, letterCount);
            letterCount += x;
        }
  
        // Check if animation is complete
        if (currentWordIndex === 0 && letterCount === 0 && waiting === false) {
            if (callback) callback();
        }
    }
  
    var animationInterval = window.setInterval(animateText, 120);
  
    var underscoreBlinkInterval = window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;
        } else {
            con.className = 'console-underscore';
            visible = true;
        }
    }, 400);
  
    // Skip button click event
    skipButton.addEventListener('click', function() {
        clearInterval(animationInterval);
        clearInterval(underscoreBlinkInterval);
        skipButton.style.display = 'none'; // Hide the button once clicked
        window.location.href = 'index.html';
    });
  }
  
  consoleText(
    ['Website Design', 'UI/UX Design', 'Digital Marketing', 'Branding', 'Logo Design', 'Hosting Options', '&lt;a&gt; Anchor Website Design Studio'], 
    'text', 
    ['tomato', 'palegoldenrod', 'rebeccapurple', 'lightblue', 'lightcoral', 'rebeccapurple', 'white'], 
    function() {
        setTimeout(function() {
            // Retrieve the target URL from query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const target = urlParams.get('target') || 'index.html'; // Fallback URL if no target specified
            window.location.href = target;
        }, 37600);
    }
  );
  