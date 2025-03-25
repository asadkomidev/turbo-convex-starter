import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
  Button,
  Preview,
  Row,
} from "@react-email/components";

interface SigninEmailProps {
  code: string;
}

export function SigninEmail({ code }: SigninEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Your verification code</Preview>
        <Body style={EMAIL_STYLES.main}>
          <Container className="py-8">
            {/* Header Section */}
            <Section className="w-full">
              <Section className="w-full">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tr>
                    <td>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Img
                          src={EMAIL_CONSTANTS.LOGO_URL}
                          width={22}
                          height={22}
                          alt="Jefot Logo"
                        />
                        <Text
                          style={{
                            color: "#000000",
                            fontSize: "24px",
                            fontWeight: 700,
                            margin: "0px 8px",
                          }}
                        >
                          Jefto
                        </Text>
                      </div>
                    </td>
                  </tr>
                </table>
                <Text className="text-[#000000] text-xl font-medium mb-6">
                  Your verification code
                </Text>
              </Section>

              {/* Main Content */}
              <Text className="text-[#666666] mb-6">
                Your verification code is below. Please enter the following code
                on the sign in page.
              </Text>

              {/* Features Section */}
              <table
                style={{
                  width: "100%",
                  backgroundColor: "#FAFAFA",
                  borderRadius: "8px",
                  paddingBottom: "40px",
                  paddingTop: "30px",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
              >
                <tr>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#666666",
                        fontSize: "14px",
                        fontWeight: 500,
                        display: "block",
                        lineHeight: "0px",
                      }}
                    >
                      Verification code
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: "36px",
                        fontWeight: 500,
                        margin: 0,
                        display: "block",
                        paddingTop: "8px",
                      }}
                    >
                      {code}
                    </Text>
                  </td>
                </tr>
              </table>

              <Text className="text-xs text-[#666666] text-center">
                This verification code will expire in 10 minutes. If you didn't
                request this code, please ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="text-center mt-8">
              <Text className="text-[#666666] text-xs">
                &copy; {EMAIL_CONSTANTS.CURRENT_YEAR} Jefto, Inc. All Rights
                Reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const EMAIL_CONSTANTS = {
  LOGO_URL:
    "https://lovable-magpie-208.convex.cloud/api/storage/8fedead1-1e52-48c8-b247-cf04f22e7476",
  CURRENT_YEAR: new Date().getFullYear(),
} as const;

const EMAIL_STYLES = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  logo: {
    margin: "auto",
    width: "50px",
    height: "50px",
  },
  headerSection: {
    marginBottom: "40px",
  },
} as const;
