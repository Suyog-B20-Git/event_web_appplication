import React, { useState, useRef } from 'react';
import { FaCog, FaPalette, FaSearch, FaShareAlt, FaEnvelope, FaBook, FaUsersCog, FaMobileAlt, FaMailBulk, FaGlobe, FaImage, FaBuilding } from 'react-icons/fa';


const InputField = ({ label, type = 'text', value, name, onChange, info, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
        {info && <p className="text-xs text-gray-500 mt-1">{info}</p>}
    </div>
);

const TextareaField = ({ label, value, name, onChange, rows = 3, placeholder }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
        />
    </div>
);

const ImageUploadField = ({ label, imageUrl, altText, onImageChange, imageClassName = 'h-12' }) => {
    const fileInputRef = useRef(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="mt-2 flex items-center space-x-6">
                <div className="p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex justify-center items-center">
                    {imageUrl ? <img src={imageUrl} alt={altText} className={imageClassName} /> : <div className={`flex flex-col items-center justify-center text-gray-400 ${imageClassName}`}><FaImage size={24} /></div>}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="text-sm font-semibold py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">Choose File</button>
            </div>
        </div>
    );
};

const SelectField = ({ label, value, name, onChange, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <select name={name} value={value} onChange={onChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {children}
        </select>
    </div>
);

const ToggleSwitch = ({ label, enabled, onChange, name, info }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <button
            type="button"
            onClick={() => onChange({ target: { name, value: !enabled } })}
            className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
        {info && <p className="text-xs text-gray-500 mt-1">{info}</p>}
    </div>
);

const InfoBanner = ({ text, url }) => (
    <div className="bg-blue-500 text-white p-3 rounded-lg text-sm">
        {text} <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-100">{url}</a>
    </div>
);

const SectionHeading = ({ title }) => (
    <div className="pb-2 border-b border-gray-200">
        <h4 className="text-md font-semibold text-gray-600">{title}</h4>
    </div>
);




const GeneralTab = ({ settings, handleInputChange, handleImageChange }) => (
    <div className="space-y-8">
        <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Information</h3>
            <div className="space-y-6">
                <InputField label="Site Name" name="siteName" value={settings.siteName} onChange={handleInputChange} placeholder="EventsNode"/>
                <InputField label="Site Slogan" name="siteSlogan" value={settings.siteSlogan} onChange={handleInputChange} placeholder="Your one-stop event solution"/>
                <TextareaField label="Extra Footer Credits" name="footerCredits" value={settings.footerCredits} onChange={handleInputChange} placeholder='<a href="https://www.masterblocks.co.in" target="_blank">MasterBlocks Pvt Ltd</a> - Company'/>
            </div>
        </div>
        <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Site Assets</h3>
            <div className="space-y-8">
                <ImageUploadField label="Site Logo" imageUrl={settings.siteLogo} altText="Site Logo" onImageChange={(img) => handleImageChange('siteLogo', img)} />
                <ImageUploadField label="Site Logo 2" imageUrl={settings.siteLogo2} altText="Site Logo 2" onImageChange={(img) => handleImageChange('siteLogo2', img)} />
                <ImageUploadField label="Site Favicon" imageUrl={settings.siteFavicon} altText="Favicon" onImageChange={(img) => handleImageChange('siteFavicon', img)} imageClassName="h-8 w-8" />
            </div>
        </div>
    </div>
);

const SeoTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <InputField label="Meta Title" name="metaTitle" value={settings.metaTitle} onChange={handleInputChange} placeholder="Book Tickets for all Upcoming Events, Add Free Events, Business Profile - Eventsnode"/>
        <TextareaField label="Meta Description" name="metaDescription" value={settings.metaDescription} onChange={handleInputChange} placeholder="Discover Latest and Upcoming Events Across all Major Cities..."/>
        <InputField label="Meta Keywords (optional)" name="metaKeywords" value={settings.metaKeywords} onChange={handleInputChange} />
    </div>
);

const SocialTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <InputField label="Facebook Page Username" name="facebookUsername" value={settings.facebookUsername} onChange={handleInputChange} placeholder="EventsNode/"/>
        <InputField label="Twitter Account Username" name="twitterUsername" value={settings.twitterUsername} onChange={handleInputChange} placeholder="eventsnode"/>
        <InputField label="Instagram URL" name="instagramUrl" value={settings.instagramUrl} onChange={handleInputChange} placeholder="https://www.instagram.com/eventsnode_official"/>
        <InputField label="LinkedIn URL" name="linkedinUrl" value={settings.linkedinUrl} onChange={handleInputChange} placeholder="https://linkedin.com/company/eventsnode"/>
    </div>
);

const ContactTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <TextareaField label="Address" name="address" value={settings.address} onChange={handleInputChange} rows={4} placeholder="Bramha Estate Complex, NIBM Road, Pune - 48"/>
        <InputField label="Phone" name="phone" value={settings.phone} onChange={handleInputChange} placeholder="+919322649044"/>
        <InputField label="Email" name="email" value={settings.email} onChange={handleInputChange} placeholder="support@eventsnode.com"/>
        <InputField label="Google Map Lat" name="mapLat" value={settings.mapLat} onChange={handleInputChange} placeholder="18.477705"/>
        <InputField label="Google Map Lng" name="mapLng" value={settings.mapLng} onChange={handleInputChange} />
    </div>
);

const BookingTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <InputField label="Pre Booking Time (hours)" name="preBookingTime" value={settings.preBookingTime} onChange={handleInputChange} type="number" placeholder="2"/>
        <InputField label="Pre Cancellation Time (hours)" name="preCancellationTime" value={settings.preCancellationTime} onChange={handleInputChange} type="number" placeholder="1"/>
        <InputField label="Max Ticket Qty Limit Per Order" name="maxTicketQty" value={settings.maxTicketQty} onChange={handleInputChange} type="number" info="Set Max ticket quantity limit to be purchased in single order. WARNING: Keep it under 100." placeholder="5"/>
        <ToggleSwitch label="Hide Expired Events" name="hideExpiredEvents" enabled={settings.hideExpiredEvents} onChange={handleInputChange} />
        <ToggleSwitch label="Allow Offline Payment For Organizer" name="allowOfflinePayment" enabled={settings.allowOfflinePayment} onChange={handleInputChange} />
        <ToggleSwitch label="Allow Offline Payment For Customer" name="allowOfflinePaymentCustomer" enabled={settings.allowOfflinePaymentCustomer} onChange={handleInputChange} />
        <SelectField label="Disable Booking Cancellation For Customers" name="disableCancellation" value={settings.disableCancellation} onChange={handleInputChange}>
            <option>Yes</option>
            <option>No</option>
        </SelectField>
        <SelectField label="Disable Ticket Download For Customers" name="disableTicketDownload" value={settings.disableTicketDownload} onChange={handleInputChange}>
            <option>No</option>
            <option>Yes</option>
        </SelectField>
        <SelectField label="Disable Google Calendar For Customers" name="disableGoogleCalendar" value={settings.disableGoogleCalendar} onChange={handleInputChange}>
            <option>No</option>
            <option>Yes</option>
        </SelectField>
    </div>
);

const MultiVendorTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <ToggleSwitch label="Multi Organisation/Vendor Mode" name="multiVendorMode" enabled={settings.multiVendorMode} onChange={handleInputChange} />
        <InputField label="Admin Commission % (add positive integer value only e.g 5)" name="adminCommission" value={settings.adminCommission} onChange={handleInputChange} type="number" placeholder="5"/>
        <SelectField label="Verify Email Before Login" name="verifyEmail" value={settings.verifyEmail} onChange={handleInputChange}>
            <option>Disabled</option>
            <option>Enabled</option>
        </SelectField>
        <SelectField label="Publish Event After Admin Approval" name="publishEventApproval" value={settings.publishEventApproval} onChange={handleInputChange}>
            <option>Enabled</option>
            <option>Disabled</option>
        </SelectField>
        <SelectField label="Manually Approve Organizer" name="manualApproveOrganizer" value={settings.manualApproveOrganizer} onChange={handleInputChange}>
            <option>Enabled</option>
            <option>Disabled</option>
        </SelectField>
        <ToggleSwitch label="Guest Checkout" name="guestCheckout" enabled={settings.guestCheckout} onChange={handleInputChange} />
        <ToggleSwitch label="Guest Email OTP Verification" name="guestEmailOtp" enabled={settings.guestEmailOtp} onChange={handleInputChange} info="This will work only if above Guest Checkout option is enabled" />
    </div>
);

const AdminTab = ({ settings, handleInputChange, handleImageChange }) => (
     <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <ImageUploadField label="Admin Background Image" imageUrl={settings.adminBg} altText="Admin BG" onImageChange={(img) => handleImageChange('adminBg', img)} imageClassName="h-24"/>
        <InputField label="Admin Title" name="adminTitle" value={settings.adminTitle} onChange={handleInputChange} placeholder="EventsNode"/>
        <InputField label="Admin Description" name="adminDescription" value={settings.adminDescription} onChange={handleInputChange} placeholder="EventsNode"/>
        <ImageUploadField label="Admin Loader" imageUrl={settings.adminLoader} altText="Admin Loader" onImageChange={(img) => handleImageChange('adminLoader', img)} imageClassName="h-16"/>
        <ImageUploadField label="Admin Icon Image" imageUrl={settings.adminIcon} altText="Admin Icon" onImageChange={(img) => handleImageChange('adminIcon', img)} imageClassName="h-16 w-16"/>
     </div>
);

const AppsTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-8">
        <div className="space-y-6">
            <SectionHeading title="Social & Analytics" />
            <InfoBanner text="Set Callback URL on your Google App Dashboard -" url="https://www.eventsnode.com/login/google/callback" />
            <InputField label="Google Client ID" name="googleClientId" value={settings.googleClientId} onChange={handleInputChange} placeholder="789139636016-fgbqjua1t0omtk4ip3849jscs9i3dd87.apps.googleusercontent.com"/>
            <InputField label="Google Client Secret" name="googleClientSecret" value={settings.googleClientSecret} onChange={handleInputChange} placeholder="Wa7XczBfBFjs7O0s3jdd8IAP"/>
            <InputField label="Google Map Key" name="googleMapKey" value={settings.googleMapKey} onChange={handleInputChange} placeholder="AIzaSyAfRZ3xPEZ3vM1bB2KacPCepjwD3fk-hhGo"/>
            <InfoBanner text="Set Callback URL on your Facebook App Dashboard -" url="https://www.eventsnode.com/login/facebook/callback" />
            <InputField label="Facebook App ID" name="facebookAppId" value={settings.facebookAppId} onChange={handleInputChange} placeholder="849920522233544"/>
            <InputField label="Facebook App Secret" name="facebookAppSecret" value={settings.facebookAppSecret} onChange={handleInputChange} placeholder="fa32b505be127d95ad17c8c72a7571ff"/>
            <InputField label="Google Analytics ID" name="googleAnalyticsId" value={settings.googleAnalyticsId} onChange={handleInputChange} placeholder="G-N05VQLFL4K"/>
        </div>

        <div className="space-y-6">
            <SectionHeading title="Payment Gateways" />
            <InfoBanner text="Set Callback URL on your PayPal Dashboard -" url="https://www.eventsnode.com/bookings/paypal/callback" />
            <InputField label="PayPal Client ID" name="paypalClientId" value={settings.paypalClientId} onChange={handleInputChange} />
            <InputField label="PayPal Secret" name="paypalSecret" value={settings.paypalSecret} onChange={handleInputChange} />
            <ToggleSwitch label="PayPal Production Mode" name="paypalProduction" enabled={settings.paypalProduction} onChange={handleInputChange} />
            <InputField label="USAePay Pin" name="usaEpayPin" value={settings.usaEpayPin} onChange={handleInputChange} />
            <InputField label="USAePay Source Key" name="usaEpaySourceKey" value={settings.usaEpaySourceKey} onChange={handleInputChange} />
            <ToggleSwitch label="USAePay Production Mode" name="usaEpayProduction" enabled={settings.usaEpayProduction} onChange={handleInputChange} />
            <InputField label="Authorize.Net Login Id" name="authNetLoginId" value={settings.authNetLoginId} onChange={handleInputChange} />
            <InputField label="Authorize.Net Transaction Key" name="authNetTransKey" value={settings.authNetTransKey} onChange={handleInputChange} />
            <ToggleSwitch label="Authorize.Net Test Mode" name="authNetTestMode" enabled={settings.authNetTestMode} onChange={handleInputChange} />
            <InputField label="Stripe Public Key" name="stripePublicKey" value={settings.stripePublicKey} onChange={handleInputChange} />
            <InputField label="Stripe Secret Key" name="stripeSecretKey" value={settings.stripeSecretKey} onChange={handleInputChange} />
            <InputField label="Stripe Webhook Secret Key" name="stripeWebhookSecret" value={settings.stripeWebhookSecret} onChange={handleInputChange} />
            <ToggleSwitch label="Stripe Direct (Auto-payout to Organizers)" name="stripeDirect" enabled={settings.stripeDirect} onChange={handleInputChange} />
            <InputField label="BitPay Key Name" name="bitpayKeyName" value={settings.bitpayKeyName} onChange={handleInputChange} />
            <InputField label="BitPay Encrypt Code" name="bitpayEncryptCode" value={settings.bitpayEncryptCode} onChange={handleInputChange} />
            <ToggleSwitch label="BitPay Production" name="bitpayProduction" enabled={settings.bitpayProduction} onChange={handleInputChange} />
            <InputField label="PayStack Public Key" name="paystackPublicKey" value={settings.paystackPublicKey} onChange={handleInputChange} />
            <InputField label="PayStack Secret Key" name="paystackSecretKey" value={settings.paystackSecretKey} onChange={handleInputChange} />
            <InputField label="PayStack Merchant Email" name="paystackMerchantEmail" value={settings.paystackMerchantEmail} onChange={handleInputChange} />
            <InputField label="RazorPay Key ID" name="razorpayKeyId" value={settings.razorpayKeyId} onChange={handleInputChange} placeholder="rzp_live_JRSNbvc1frq4vl"/>
            <InputField label="RazorPay Key Secret" name="razorpayKeySecret" value={settings.razorpayKeySecret} onChange={handleInputChange} placeholder="lyDRh12WlamGRS8mQOuE6H"/>
            <ToggleSwitch label="PayTM Live Mode" name="paytmLiveMode" enabled={settings.paytmLiveMode} onChange={handleInputChange} />
            <InputField label="PayTM Merchant ID" name="paytmMerchantId" value={settings.paytmMerchantId} onChange={handleInputChange} />
            <InputField label="PayTM Merchant Key" name="paytmMerchantKey" value={settings.paytmMerchantKey} onChange={handleInputChange} />
            <InputField label="PayTM Merchant Website" name="paytmMerchantWebsite" value={settings.paytmMerchantWebsite} onChange={handleInputChange} />
            <InputField label="PayTM Channel" name="paytmChannel" value={settings.paytmChannel} onChange={handleInputChange} />
            <InputField label="PayTM Industry Type" name="paytmIndustryType" value={settings.paytmIndustryType} onChange={handleInputChange} />
        </div>

        <div className="space-y-6">
            <SectionHeading title="Communication APIs" />
            <InputField label="Twilio Sid" name="twilioSid" value={settings.twilioSid} onChange={handleInputChange} />
            <InputField label="Twilio Auth Token" name="twilioAuthToken" value={settings.twilioAuthToken} onChange={handleInputChange} />
            <InputField label="Twilio Number" name="twilioNumber" value={settings.twilioNumber} onChange={handleInputChange} />
        </div>
    </div>
);

const MailTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <InputField label="Mail Driver" name="mailDriver" value={settings.mailDriver} onChange={handleInputChange} placeholder="smtp"/>
        <InputField label="Mail Host" name="mailHost" value={settings.mailHost} onChange={handleInputChange}/>
        <InputField label="Mail Port" name="mailPort" value={settings.mailPort} onChange={handleInputChange}/>
        <InputField label="Mail Username" name="mailUsername" value={settings.mailUsername} onChange={handleInputChange} placeholder="support@eventsnode.com"/>
        <InputField label="Mail Password" name="mailPassword" value={settings.mailPassword} onChange={handleInputChange} type="password"/>
        <InputField label="Mail Encryption" name="mailEncryption" value={settings.mailEncryption} onChange={handleInputChange}/>
        <InputField label="Mail From Address" name="mailFromAddress" value={settings.mailFromAddress} onChange={handleInputChange}/>
        <InputField label="Mail From Name" name="mailFromName" value={settings.mailFromName} onChange={handleInputChange}/>
    </div>
);

const RegionalTab = ({ settings, handleInputChange }) => (
    <div className="p-6 border border-gray-200 rounded-lg space-y-6">
        <SelectField label="Timezone" name="timezone" value={settings.timezone} onChange={handleInputChange}>
            <option>Asia/Kolkata</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
        </SelectField>
        <InputField label="Currency" name="currency" value={settings.currency} onChange={handleInputChange} info="Add currency shortcode only e.g USD/EUR/GBP, etc. DO NOT ADD CURRENCY ICON." placeholder="INR"/>
        <SelectField label="Date Format" name="dateFormat" value={settings.dateFormat} onChange={handleInputChange}>
            <option>D M Y (e.g 08 Mar 2021)</option>
            <option>M D Y (e.g Mar 08 2021)</option>
            <option>Y M D (e.g 2021 Mar 08)</option>
        </SelectField>
         <SelectField label="Time Format" name="timeFormat" value={settings.timeFormat} onChange={handleInputChange}>
            <option>12 Hours</option>
            <option>24 Hours</option>
        </SelectField>
        <ToggleSwitch label="Timezone Conversion" name="timezoneConversion" enabled={settings.timezoneConversion} onChange={handleInputChange} />
    </div>
);


// --- Main AdminSettings Component ---
const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        // General
        siteName: '', siteSlogan: '', footerCredits: '', siteLogo: 'https://i.imgur.com/J832T4H.png', siteLogo2: '', siteFavicon: '',
        // SEO
        metaTitle: '', metaDescription: '', metaKeywords: '',
        // Social
        facebookUsername: '', twitterUsername: '', instagramUrl: '', linkedinUrl: '',
        // Contact
        address: '', phone: '', email: '', mapLat: '', mapLng: '',
        // Booking
        preBookingTime: '', preCancellationTime: '', maxTicketQty: '', hideExpiredEvents: true, allowOfflinePayment: true, allowOfflinePaymentCustomer: false, disableCancellation: 'Yes', disableTicketDownload: 'No', disableGoogleCalendar: 'No',
        // Multi-vendor
        multiVendorMode: false, adminCommission: '', verifyEmail: 'Disabled', publishEventApproval: 'Enabled', manualApproveOrganizer: 'Enabled', guestCheckout: true, guestEmailOtp: true,
        // Admin
        adminBg: 'https://i.imgur.com/3Z2qzsc.png', adminTitle: '', adminDescription: '', adminLoader: '', adminIcon: 'https://i.imgur.com/SUA0t2r.png',
        // Apps
        googleClientId: '', googleClientSecret: '', googleMapKey: '', facebookAppId: '', facebookAppSecret: '', googleAnalyticsId: '', paypalClientId: '', paypalSecret: '', paypalProduction: false, usaEpayPin: '', usaEpaySourceKey: '', usaEpayProduction: false, authNetLoginId: '', authNetTransKey: '', authNetTestMode: false, stripePublicKey: '', stripeSecretKey: '', stripeWebhookSecret: '', stripeDirect: false, bitpayKeyName: '', bitpayEncryptCode: '', bitpayProduction: false, twilioSid: '', twilioAuthToken: '', twilioNumber: '', paystackPublicKey: '', paystackSecretKey: '', paystackMerchantEmail: '', razorpayKeyId: '', razorpayKeySecret: '', paytmLiveMode: false, paytmMerchantId: '', paytmMerchantKey: '', paytmMerchantWebsite: '', paytmChannel: '', paytmIndustryType: '',
        // Mail
        mailDriver: '', mailHost: '', mailPort: '', mailUsername: '', mailPassword: '', mailEncryption: '', mailFromAddress: '', mailFromName: '',
        // Regional
        timezone: 'Asia/Kolkata', currency: '', dateFormat: 'D M Y (e.g 08 Mar 2021)', timeFormat: '12 Hours', timezoneConversion: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };
    
    const handleToggleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (field, imageData) => {
        setSettings(prev => ({ ...prev, [field]: imageData }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Settings saved successfully!');
        console.log('Saving settings:', settings);
    };

    const tabs = [
        { id: 'general', label: 'Site', icon: <FaPalette /> },
        { id: 'seo', label: 'SEO', icon: <FaSearch /> },
        { id: 'social', label: 'Social', icon: <FaShareAlt /> },
        { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
        { id: 'booking', label: 'Booking', icon: <FaBook /> },
        { id: 'multi-vendor', label: 'Multi-vendor', icon: <FaUsersCog /> },
        { id: 'admin', label: 'Admin', icon: <FaBuilding /> },
        { id: 'apps', label: 'Apps', icon: <FaMobileAlt /> },
        { id: 'mail', label: 'Mail', icon: <FaMailBulk /> },
        { id: 'regional', label: 'Regional', icon: <FaGlobe /> },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralTab settings={settings} handleInputChange={handleInputChange} handleImageChange={handleImageChange} />;
            case 'seo': return <SeoTab settings={settings} handleInputChange={handleInputChange} />;
            case 'social': return <SocialTab settings={settings} handleInputChange={handleInputChange} />;
            case 'contact': return <ContactTab settings={settings} handleInputChange={handleInputChange} />;
            case 'booking': return <BookingTab settings={settings} handleInputChange={handleToggleChange} />;
            case 'multi-vendor': return <MultiVendorTab settings={settings} handleInputChange={handleToggleChange} />;
            case 'admin': return <AdminTab settings={settings} handleInputChange={handleInputChange} handleImageChange={handleImageChange}/>;
            case 'apps': return <AppsTab settings={settings} handleInputChange={handleToggleChange} />;
            case 'mail': return <MailTab settings={settings} handleInputChange={handleInputChange} />;
            case 'regional': return <RegionalTab settings={settings} handleInputChange={handleToggleChange} />;
            default: return null;
        }
    };

    return (
        <div className="bg-gray-50 p-4 md:p-6 min-h-screen">
            <header className="mb-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg"><FaCog className="text-2xl text-indigo-600" /></div>
                    <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                </div>
            </header>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex flex-wrap -mb-px px-4" aria-label="Tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center whitespace-nowrap py-4 px-3 md:px-4 border-b-2 font-medium text-sm transition-colors duration-200
                                    ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }
                                `}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSave}>
                        {renderTabContent()}
                        <div className="mt-8 pt-5 border-t border-gray-200">
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
