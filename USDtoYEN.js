// ==UserScript==
// @name        USD->YEN WebConverter
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      balds235
// @description 5/17/2024, 11:14:21 AM
// ==/UserScript==
//THIS IS A USD->YEN TRANSLATOR. IF YOU WANT YEN->USD CHECK MY OTHER REPOSITORY NAMED YEN-USD-WEBCONVERTER//
//im not good with apis or javascript so there is probably something fucked with the code mb yall//
(function() {
    'use strict';

    const apiKey = 'INPUT YOUR OWN API KEY HERE!!!! ITS FREE AND TAKES LESS THAN 3 MINUTES';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // Function to fetch the exchange rate and convert USD to YEN
    async function convertUSDToYEN() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const rate = data.conversion_rates.JPY;

            // Select all elements that could have USD values
            const usdElements = document.querySelectorAll('body *:not(script):not(style):not(link):not(meta):not(title)');

            usdElements.forEach(element => {
                const usdText = element.innerHTML.match(/\$\d+(,\d{3})*(\.\d+)?/g);
                if (usdText) {
                    usdText.forEach(usdValue => {
                        const usdAmount = parseFloat(usdValue.replace(/[^0-9.-]+/g,""));
                        const yenAmount = (usdAmount * rate).toFixed(2);
                        const formattedYen = formatNumberWithCommas(yenAmount);
                        const formattedUsd = formatNumberWithCommas(usdAmount);
                        const newValue = `$${formattedUsd} (≈ ¥${formattedYen} YEN)`;
                        element.innerHTML = element.innerHTML.replace(usdValue, newValue);
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    }

    // Function to format numbers with commas
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Run the conversion function when the page is loaded
    window.addEventListener('load', convertUSDToYEN);

})();


