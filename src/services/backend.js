// ⚠️ ACTION REQUIRED: Replace the URL below with your deployed Google Apps Script Web App URL
// You can get this from the "Deploy" -> "New Deployment" menu in your Google Apps Script editor.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby9bBV-lEg5XQ8Rrwfx-kpBVW-eEd2o4wtU7EnR3G3Rf_WwDHoF0UnEOHXs_118Jnux9w/exec';

export const submitScore = async (data) => {
    // Check if the user has replaced the default URL
    if (SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        console.warn('Backend Sync Skip: SCRIPT_URL is still the placeholder. Please deploy your Google Apps Script and update src/services/backend.js');
        return false;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return true;
    } catch (error) {
        console.error('Error submitting score to Google Sheet:', error);
        return false;
    }
};
