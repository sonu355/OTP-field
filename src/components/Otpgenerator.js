import { Button } from "@mui/material";
import React, { useState } from 'react';
import PhoneVerificationPopup1 from './PhoneVerificationPopup1';

const Otpgenerator  = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: 'linear-gradient(90deg, rgba(232,219,225,1) 0%, rgba(255,238,238,1) 100%)',
  };
  const [showPhoneVerificationPopup, setShowPhoneVerificationPopup] = useState(false);

  function handleVerifyPhoneNumberClick() {
    setShowPhoneVerificationPopup(true);
  }

  return (
    <div style={style}>
      {!showPhoneVerificationPopup && (
        <Button color="primary" variant="contained" onClick={handleVerifyPhoneNumberClick}>
          Verify Phone Number
        </Button>
      )}
      {showPhoneVerificationPopup && <PhoneVerificationPopup1 />}
    </div>
  )
}

export default Otpgenerator;
