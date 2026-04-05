// GOOGLE APPS SCRIPT - Copy this code to your Google Sheet
// Instructions:
// 1. Open your Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Delete the default code and paste THIS entire code
// 4. Save the project (name it: FormDataHandler or similar)
// 5. Run -> Deploy > New deployment > Type: Web app
// 6. Execute as: Your email
// 7. Who has access: Anyone
// 8. Copy the deployment URL and add to .env as GOOGLE_APPS_SCRIPT_URL

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action; // 'contact' or 'newsletter'
    const formData = data.data; // Object with form fields

    let sheetName = 'Contact Submissions'; // Default sheet name
    
    if (action === 'newsletter') {
      sheetName = 'Newsletter Subscribers'; // Change to your newsletter sheet name
    }

    // Get the sheet (create if doesn't exist)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName, ss.getSheets().length);
      
      // Add headers if sheet is new
      if (action === 'contact') {
        const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Business Name', 'Business Address', 'Service', 'Budget', 'Message'];
        sheet.appendRow(headers);
      } else if (action === 'newsletter') {
        const headers = ['Email', 'SubscribedDate', 'Source'];
        sheet.appendRow(headers);
      }
    }

    // Prepare row data
    let row = [];
    let headers = [];
    
    if (action === 'contact') {
      headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Business Name', 'Business Address', 'Service', 'Budget', 'Message'];
    } else if (action === 'newsletter') {
      headers = ['Email', 'SubscribedDate', 'Source'];
    }

    // Build row by column order
    headers.forEach(header => {
      row.push(formData[header] || '');
    });

    // Append row to sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        id: `${Date.now()}`
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString(),
        error: error.stack
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check function
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Google Apps Script is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
