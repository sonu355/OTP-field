import { Button, TextField } from "@mui/material";
import React, { useState } from 'react';

const PhoneVerificationPopup = () => {
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const [isOtpValid, setIsOtpValid] = useState(true)

    function handleOtpChange(event, index) {
        const value = event.target.value;
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value.replace(/\D/, '').slice(0, 1); // only allow digits and restrict to single char
        setOtpValues(newOtpValues);

        if (value === "" && index > 0) { // handle backspace
            document.getElementById(`otp-${index - 1}`).focus();
        } else if (value !== "" && index < otpValues.length - 1) { // handle forward focus
            document.getElementById(`otp-${index + 1}`).focus();
        }
        setIsOtpValid(true)
    }

    function handlePaste(event) {
        event.preventDefault();
        const pasteData = event.clipboardData.getData("text/plain");
        const newOtpValues = [...otpValues];

        for (let i = 0; i < pasteData.length && i < newOtpValues.length; i++) {
            const char = pasteData.charAt(i);
            if (/\d/.test(char)) { // only allow digits
                newOtpValues[i] = char;
            }
        }
        setOtpValues(newOtpValues);
        setIsOtpValid(true)
        const emptyIndex = newOtpValues.findIndex(value => value === "");
            if (emptyIndex !== -1) {
                document.getElementById(`otp-${emptyIndex}`).focus();
            }
    }
    
    function handleVerify() {
        const isInvalid = otpValues.some(value => value === "");
        setIsOtpValid(!isInvalid); // show warning if any input is empty
        if (!isInvalid) {
            console.log("OTP is valid and verified!");
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", border: '5px solid grey', borderTop: 'none', borderBottom: 'none', width: '60%', height: '60%' }}>
            <h2>Phone Verification</h2>
            <p style={{ color: 'gray' }}>Please enter the 6-digit verification code sent to your phone</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {otpValues.map((value, index) => (
                    <TextField
                        key={index}
                        id={`otp-${index}`}
                        value={value}
                        onChange={(event) => handleOtpChange(event, index)}
                        onKeyDown={(event) => {
                            if (event.key === "ArrowLeft" && index > 0) {
                                document.getElementById(`otp-${index - 1}`).focus();
                            } else if (event.key === "ArrowRight" && index < otpValues.length - 1) {
                                document.getElementById(`otp-${index + 1}`).focus();
                            }
                        }}
                        onPaste={handlePaste}
                        inputProps={{
                            style: {
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                letterSpacing: "1rem",
                                borderRadius: "0.5rem",
                                backgroundColor: "#f0f0f0",
                                width: "3rem",
                                height: "3rem",
                            },
                        }}
                    />
                ))}
            </div>
            <div style={{color:"blue", display: "flex", justifyContent: "space-between", width: "100%", marginTop: "1rem" }}>
                <div>Change Number</div>
                <div>Re-send OTP</div>
            </div>

            {isOtpValid && <p style={{ color: "red" }}></p>}
            <Button style={{ marginTop: "2rem", borderRadius: "20px", width: "200px", display: "inline-block" }} color="success" variant="contained" onClick={handleVerify}>
                VERIFY
            </Button>
        </div>
    )
}
export default PhoneVerificationPopup;
