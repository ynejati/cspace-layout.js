import React from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'react-modal';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Modal.css';
import footerButtonStyles from '../../styles/cspace-layout/ModalFooterButton.css';
import headerButtonStyles from '../../styles/cspace-layout/ModalHeaderButton.css';
import overlayStyles from '../../styles/cspace-layout/Overlay.css';

const renderCloseButton = (config) => {
  const {
    closeButtonClassName,
    closeButtonLabel,
    showCloseButton,
    onCloseButtonClick,
  } = config;

  if (!showCloseButton) {
    return null;
  }

  return (
    <button
      className={classNames(closeButtonClassName, headerButtonStyles.common)}
      name="close"
      onClick={onCloseButtonClick}
    >
      {closeButtonLabel}
    </button>
  );
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  contentLabel: PropTypes.string,
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  acceptButtonClassName: PropTypes.string,
  acceptButtonDisabled: PropTypes.bool,
  acceptButtonLabel: PropTypes.string,
  cancelButtonClassName: PropTypes.string,
  cancelButtonDisabled: PropTypes.bool,
  cancelButtonLabel: PropTypes.string,
  closeButtonClassName: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  showAcceptButton: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  renderButtonBar: PropTypes.func,
  renderCloseButton: PropTypes.func,
  onAcceptButtonClick: PropTypes.func,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
};

const defaultProps = {
  renderCloseButton,
  contentLabel: 'Modal',
  acceptButtonLabel: 'OK',
  cancelButtonLabel: 'Cancel',
  closeButtonLabel: '×',
  showAcceptButton: true,
  showCancelButton: true,
  showCloseButton: true,
  renderButtonBar: (config) => {
    const {
      acceptButtonClassName,
      acceptButtonDisabled,
      acceptButtonLabel,
      cancelButtonClassName,
      cancelButtonDisabled,
      cancelButtonLabel,
      showAcceptButton,
      showCancelButton,
      onAcceptButtonClick,
      onCancelButtonClick,
    } = config;

    let acceptButton;

    if (showAcceptButton) {
      acceptButton = (
        <button
          className={classNames(acceptButtonClassName, footerButtonStyles.common)}
          disabled={acceptButtonDisabled}
          name="accept"
          onClick={onAcceptButtonClick}
        >
          {acceptButtonLabel}
        </button>
      );
    }

    let cancelButton;

    if (showCancelButton) {
      cancelButton = (
        <button
          className={classNames(cancelButtonClassName, footerButtonStyles.common)}
          disabled={cancelButtonDisabled}
          name="cancel"
          onClick={onCancelButtonClick}
        >
          {cancelButtonLabel}
        </button>
      );
    }

    return (
      <div>
        {cancelButton}
        {acceptButton}
      </div>
    );
  },
};

export default function Modal(props) {
  const {
    children,
    className,
    contentLabel,
    isOpen,
    title,
    renderButtonBar,
    acceptButtonClassName,
    acceptButtonDisabled,
    acceptButtonLabel,
    cancelButtonClassName,
    cancelButtonDisabled,
    cancelButtonLabel,
    closeButtonClassName,
    closeButtonLabel,
    showAcceptButton,
    showCancelButton,
    showCloseButton,
    onAcceptButtonClick,
    onCancelButtonClick,
    onCloseButtonClick,
    ...remainingProps
  } = props;

  const closeButton = renderCloseButton({
    closeButtonClassName,
    closeButtonLabel,
    showCloseButton,
    onCloseButtonClick,
  });

  const buttonBar = renderButtonBar({
    acceptButtonClassName,
    acceptButtonDisabled,
    acceptButtonLabel,
    cancelButtonClassName,
    cancelButtonDisabled,
    cancelButtonLabel,
    showAcceptButton,
    showCancelButton,
    onAcceptButtonClick,
    onCancelButtonClick,
  });

  return (
    <BaseModal
      {...remainingProps}
      contentLabel={contentLabel}
      isOpen={isOpen}
      className={styles.common}
      overlayClassName={overlayStyles.common}
      portalClassName={className}
    >
      <header>
        <div>{title}</div>
        {closeButton}
      </header>
      <div>
        {children}
      </div>
      <footer>
        {buttonBar}
      </footer>
    </BaseModal>
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.setAppElement = element => BaseModal.setAppElement(element);
