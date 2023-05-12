const { transporter } = require("../config");

message = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        h1 {
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 20px;
            text-align: left;
            color: #007bff;
        }
        p {
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 16px;
            text-align: left;
        }
        .code-container {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 200px;
            margin-top: 20px;
        }
        .code {
            display: inline-block;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            text-align: center;
        }
        .code:hover {
            background-color: #0062cc;
        }
    </style>
</head>
<body>
    <h1>Email Verification</h1>
    <p>Thank you for signing up! Please use the following verification code to complete your registration:</p>
    <div class="code-container">
        <p class="code">{code}</p>
    </div>
    <p>If you did not sign up for this service, please ignore this email.</p>
</body>
</html>
`;

const sendMail = async (to, code) => {
  await transporter.sendMail({
    from: "PrepX",
    to: to,
    subject: "PrepX: Email Verification",
    html: message.replace("{code}", code),
  });
  return code;
};

module.exports = sendMail;
