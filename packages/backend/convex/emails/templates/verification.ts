export const getVerificationEmailTemplate = (
  token: string,
  currentYear: number
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your verification code</title>
    <!--[if mso]>
      <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
      </style>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 0; background-color: #ffffff;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td align="center" style="padding: 32px 0;">
          <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 100%; padding: 0 24px;">
            <!-- Header -->
            <tr>
              <td style="padding-bottom: 32px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <table border="0" cellpadding="0" cellspacing="0" style="line-height: 0;">
                        <tr>
                          <td style="padding-right: 4px;">
                           <svg
                            width="24"
                            height="24"
                            viewBox="0 0 102 102"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-foreground"
                          >
                            <path
                              d="M50.5 2L1 101.5H26.5L50.5 54L74.5 101.5H100.5L50.5 2Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                            <path
                              d="M50.5 71L35 101.5H66L50.5 71Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          </svg>
                          </td>
                          <td>
                            <span style="color: #000000; font-size: 24px; font-weight: 700; line-height: 24px;">Tcn Inc.</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding-bottom: 24px;">
                <h1 style="margin: 0; color: #000000; font-size: 20px; font-weight: 500;">Your verification code</h1>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding-bottom: 24px;">
                <p style="margin: 0; color: #666666; font-size: 16px;">
                  Your verification code is below. Please enter the following code on the sign in page.
                </p>
              </td>
            </tr>

            <!-- Code Box -->
            <tr>
              <td style="padding-bottom: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FAFAFA; border-radius: 8px;">
                  <tr>
                    <td style="padding: 32px; text-align: center;">
                      <p style="margin: 0 0 4px 0; color: #666666; font-size: 14px; font-weight: 500;">
                        Verification code
                      </p>
                      <p style="margin: 0; color: #000000; font-size: 36px; font-weight: 500; letter-spacing: 4px;">
                        ${token}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Note -->
            <tr>
              <td style="padding-bottom: 32px; text-align: center;">
                <p style="margin: 0; color: #666666; font-size: 12px;">
                  This verification code will expire in 10 minutes.<br/>
                  If you didn't request this code, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="text-align: center;">
                <p style="margin: 0; color: #666666; font-size: 12px;">
                  &copy; ${currentYear} Tcn Inc. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
