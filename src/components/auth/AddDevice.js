import { React, useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import QRCode from "qrcode.react";
import LoadingComponent from '../common/LoadingComponent';
import { fetchTotpUrl } from '../../services/auth/loginService';
import TOTPAuth from './TOTPAuth';

const AddDevice = () => {
    const [url, setUrl] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const totpUrl = await fetchTotpUrl();
            if (totpUrl.startsWith('otpauth://')) {
                setUrl(totpUrl);
            } else {
                setToastMessage(totpUrl);
            }
            setLoading(false);
        })();
    }, [])

    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="mr-auto">Incorrect details</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "16px"}}>
                <QRCode value={url} />
            </div>
            <TOTPAuth />
        </div>
    )
}

export default AddDevice;
