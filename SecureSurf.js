
    // Password visibility toggle
    function togglePassword() {
      const passwordField = document.getElementById('password');
      const passwordType = passwordField.type;
      
      if (passwordType === 'password') {
        passwordField.type = 'text';
      } else {
        passwordField.type = 'password';
      }
    }
    
    // Show notification
    function showNotification(message, type = 'success') {
      const notification = document.getElementById('notification');
      const notificationText = document.getElementById('notificationText');
      const notificationIcon = notification.querySelector('.notification-icon');
      
      notification.className = 'notification ' + type;
      notificationText.textContent = message;
      
      // Set icon based on type
      if (type === 'success') {
        notificationIcon.innerHTML = '✓';
      } else if (type === 'error') {
        notificationIcon.innerHTML = '✗';
      } else if (type === 'warning') {
        notificationIcon.innerHTML = '!';
      }
      
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
    
    // Login button event
    document.getElementById('loginBtn').addEventListener('click', function() {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      
      if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
      }
      
      if (!password) {
        showNotification('Please enter your password', 'error');
        return;
      }
      
      // Hide login container and show checker container
      document.getElementById('loginContainer').style.display = 'none';
      document.getElementById('checkerContainer').style.display = 'flex';
      
      showNotification('Login successful! Welcome to SecureSurf', 'success');
    });
    
    // URL Check button event
    document.getElementById('checkBtn').addEventListener('click', function() {
      const url = document.getElementById('urlInput').value.trim();
      
      if (!url) {
        showNotification('Please enter a URL to check', 'error');
        return;
      }
      
      if (!isValidURL(url)) {
        showNotification('Please enter a valid URL', 'error');
        return;
      }
      
      // Hide result card and show loader
      document.getElementById('resultCard').style.display = 'none';
      document.getElementById('loader').style.display = 'block';
      
      // Perform URL check
      checkURL(url);
    });
    
    // Validate URL format
    function isValidURL(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }
    
    // Check URL for phishing indicators
    function checkURL(url) {
      // Simulating API call with setTimeout
      setTimeout(() => {
        // Hide loader
        document.getElementById('loader').style.display = 'none';
        
        // Common phishing indicators to check
        const phishingIndicators = {
          suspiciousDomain: checkSuspiciousDomain(url),
          secureConnection: checkSecureConnection(url),
          domainAge: checkDomainAge(url),
          redirects: checkRedirects(url),
          blacklisted: checkBlacklisted(url)
        };
        
        // Calculate risk score (0-100)
        const riskScore = calculateRiskScore(phishingIndicators);
        
        // Display results
        displayResults(url, phishingIndicators, riskScore);
        
        // Show notification
        if (riskScore < 30) {
          showNotification('URL appears to be safe', 'success');
        } else if (riskScore < 70) {
          showNotification('URL has some suspicious indicators', 'warning');
        } else {
          showNotification('URL is likely a phishing attempt!', 'error');
        }
        
      }, 1500); // Simulate processing time
    }
    
    // Check for suspicious domain patterns
    function checkSuspiciousDomain(url) {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      // Check for common brand names with typos or misspellings
      const commonBrands = ['google', 'microsoft', 'apple', 'amazon', 'facebook', 'paypal', 'netflix'];
      let suspicious = false;
      let reason = '';
      
      // Check for similar but not exact matches to popular domains
      commonBrands.forEach(brand => {
        if (domain.includes(brand) && !domain.endsWith(brand + '.com')) {
          suspicious = true;
          reason = `Contains '${brand}' but is not the official domain`;
        }
      });
      
      // Check for excessive subdomains
      if (domain.split('.').length > 3) {
        suspicious = true;
        reason = 'Excessive subdomains detected';
      }
      
      // Check for unusual TLDs often used in phishing
      const suspiciousTLDs = ['.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq'];
      suspiciousTLDs.forEach(tld => {
        if (domain.endsWith(tld)) {
          suspicious = true;
          reason = `Uses suspicious TLD: ${tld}`;
        }
      });
      
      // Check for random-looking subdomains
      const randomPattern = /[a-z0-9]{8,}\.domain\.com/i;
      if (randomPattern.test(domain)) {
        suspicious = true;
        reason = 'Random-looking subdomain detected';
      }
      
      return {
        result: suspicious,
        reason: suspicious ? reason : 'Domain appears legitimate'
      };
    }
    
    // Check if the URL uses HTTPS
    function checkSecureConnection(url) {
      const isSecure = url.startsWith('https://');
      
      return {
        result: !isSecure, // true = problem detected
        reason: isSecure ? 'Uses secure HTTPS connection' : 'Not using secure HTTPS connection'
      };
    }
    
    // Simulate checking domain age
    function checkDomainAge(url) {
      // In a real implementation, this would query a WHOIS database
      // For demo, we'll generate a random age for some domains and fixed ages for well-known domains
      
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      let ageInDays;
      let suspicious = false;
      
      // Well-known domains with set ages
      if (domain.includes('google.com')) {
        ageInDays = 8000; // About 22 years
      } else if (domain.includes('facebook.com')) {
        ageInDays = 6500; // About 18 years
      } else if (domain.includes('amazon.com')) {
        ageInDays = 9500; // About 26 years
      } else if (domain.includes('microsoft.com')) {
        ageInDays = 10000; // About 27 years
      } else {
        // Generate a random age for other domains
        // Higher probability of young domains for suspicious-looking URLs
        if (domain.length > 15 || domain.split('.').length > 3) {
          ageInDays = Math.floor(Math.random() * 30) + 1; // 1-30 days
          suspicious = true;
        } else {
          ageInDays = Math.floor(Math.random() * 1000) + 100; // 100-1100 days
        }
      }
      
      // Domains less than 30 days old are suspicious
      if (ageInDays < 30) {
        suspicious = true;
      }
      
      const ageText = ageInDays < 30 ? 
            `${ageInDays} days (suspicious)` : 
            ageInDays < 365 ? 
            `${Math.floor(ageInDays / 30)} months` : 
            `${Math.floor(ageInDays / 365)} years`;
      
      return {
        result: suspicious,
        reason: `Domain age: ${ageText}`
      };
    }
    
    // Simulate checking for redirects
    function checkRedirects(url) {
      // In a real implementation, this would follow the URL and check for redirects
      // For demo purposes, we'll generate random results
      
      const hasRedirects = Math.random() > 0.7;
      const redirectCount = hasRedirects ? Math.floor(Math.random() * 3) + 1 : 0;
      
      return {
        result: hasRedirects,
        reason: hasRedirects ? 
          `Detected ${redirectCount} redirect${redirectCount > 1 ? 's' : ''}` : 
          'No suspicious redirects detected'
      };
    }
    
    // Simulate checking against blacklists
    function checkBlacklisted(url) {
      // In a real implementation, this would check against phishing blacklists
      // For demo purposes, we'll check against a small hardcoded list and generate random results for others
      
      const urlObj = new URL(url);
      const domain = urlObj.hostname;
      
      // Demo blacklist
      const blacklist = [
        'phishing-example.com',
        'secure-banking-login.tk',
        'account-verification-required.xyz',
        'login-secure-support.ml'
      ];
      
      const isBlacklisted = blacklist.some(item => domain.includes(item));
      
      // For demo, also randomly mark some suspicious-looking domains
      const randomBlacklist = 
        !isBlacklisted && 
        (domain.includes('secure') || domain.includes('login') || domain.includes('account')) && 
        Math.random() > 0.5;
      
      return {
        result: isBlacklisted || randomBlacklist,
        reason: isBlacklisted || randomBlacklist ? 
          'Domain found in phishing blacklists' : 
          'Domain not found in known blacklists'
      };
    }
    
    // Calculate risk score based on indicators
    function calculateRiskScore(indicators) {
      let score = 0;
      
      // Weight different indicators
      if (indicators.suspiciousDomain.result) score += 30;
      if (indicators.secureConnection.result) score += 20;
      if (indicators.domainAge.result) score += 15;
      if (indicators.redirects.result) score += 15;
      if (indicators.blacklisted.result) score += 40;
      
      // Cap at 100
      return Math.min(score, 100);
    }
    
    // Display results on the page
    function displayResults(url, indicators, riskScore) {
      const resultCard = document.getElementById('resultCard');
      const resultIcon = document.getElementById('resultIcon');
      const resultTitle = document.getElementById('resultTitle');
      const resultDetails = document.getElementById('resultDetails');
      
      // Clear previous results
      resultDetails.innerHTML = '';
      
      // Set result icon and title based on risk score
      if (riskScore < 30) {
        resultIcon.className = 'result-icon safe';
        resultIcon.innerHTML = '✓';
        resultTitle.textContent = 'URL appears to be safe';
      } else if (riskScore < 70) {
        resultIcon.className = 'result-icon unkn';
        resultIcon.innerHTML = '!';
        resultTitle.textContent = 'Potentially suspicious URL';
      } else {
        resultIcon.className = 'result-icon risk';
        resultIcon.innerHTML = '✗';
        resultTitle.textContent = 'High-risk phishing URL detected';
      }
      
      // Add URL being checked
      const urlElement = document.createElement('div');
      urlElement.className = 'detail-item';
      urlElement.innerHTML = `
        <span class="detail-icon">🔗</span>
        <span class="detail-text"><strong>URL:</strong> ${url}</span>
      `;
      resultDetails.appendChild(urlElement);
      
      // Add risk score
      const scoreElement = document.createElement('div');
      scoreElement.className = 'detail-item';
      scoreElement.innerHTML = `
        <span class="detail-icon">🔒</span>
        <span class="detail-text"><strong>Risk Score:</strong> ${riskScore}/100</span>
      `;
      resultDetails.appendChild(scoreElement);
      
      // Add each indicator result
      for (const [key, value] of Object.entries(indicators)) {
        const indicatorElement = document.createElement('div');
        indicatorElement.className = 'detail-item';
        
        let icon = '✓';
        let color = 'green';
        
        if (value.result) {
          icon = '✗';
          color = 'red';
        }
        
        // Format the key name for display
        const keyFormatted = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
        
        indicatorElement.innerHTML = `
          <span class="detail-icon" style="color: ${color}">${icon}</span>
          <span class="detail-text"><strong>${keyFormatted}:</strong> ${value.reason}</span>
        `;
        
        resultDetails.appendChild(indicatorElement);
      }
      
      // Show the result card
      resultCard.style.display = 'block';
    }
