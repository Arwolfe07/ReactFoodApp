import React, { Fragment } from "react";
import reactDom from "react-dom";

import classes from "./Modal.module.css";

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>;
};

const overlayLoc = document.getElementById("overlays");

const Modal = (props) => {
    return <Fragment>
        {reactDom.createPortal(<BackDrop onClick={props.onClick} />, overlayLoc)}.
        {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayLoc)}
    </Fragment>
};

export default Modal;