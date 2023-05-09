import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

function Otp() {
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, [isPopupVisible]);

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
      if (event.target.nextSibling) {
        event.target.nextSibling.focus();
      }
    } else if (value.length > 1) {
      event.target.value = value.slice(0, 1);
    }
  };

  const handleInputKeyDown = (index, event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case "ArrowRight":
        if (index < otp.length - 1) {
          inputRefs.current[index + 1].focus();
        }
        break;
      case "Backspace":
        if (event.target.value === "") {
          if (index > 0) {
            inputRefs.current[index - 1].focus();
          }
        }
        break;
      default:
        break;
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text");
    const otpArray = clipboardData.split("").slice(0, otp.length);
    const newOtp = otpArray.map((digit) => (/^[0-9]*$/.test(digit) ? digit : ""));
    setOtp(newOtp);
  };

  const handlePopupClose = () => {
    setPopupVisibility(false);
  };

  const handleButtonClick = () => {
    setPopupVisibility(true);
  };

  return (
    <>
      <Button sx={{alignContent: 'center', justifyContent: 'center'}} variant="contained" onClick={handleButtonClick}>Verify Phone Number</Button>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handlePopupClose}>
              &times;
            </span>
            <h2>Phone Verification</h2>
            <p>Please enter the 6-digit verification code sent to your phone.</p>
            <div className="otp-input">
              {otp.map((digit, index) => (
                <input
                  type="text"
                  maxLength={1}
                  value={digit}
                  key={index}
                  onChange={(event) => handleInputChange(index, event)}
                  onKeyDown={(event) => handleInputKeyDown(index, event)}
                  onPaste={handlePaste}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Otp;
