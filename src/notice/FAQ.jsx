/* eslint-disable no-unused-vars */
import { useState } from "react";
import Header from '../components/header';
import '../assets/styles/common.css';
import './FAQ.css';


export default function FAQ() {

    return (
        <div className="ViewBox">
            <div className="ResponsiveScreen1">PeakTime</div>
            <div id='FAQ' className="MyPageAlways">
                <Header />
                <div className="FAQ"></div>
            </div>
            <div className="ResponsiveScreen2">LikeLion</div>
        </div>
    )
}
