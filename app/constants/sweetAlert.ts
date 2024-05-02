const sweetAlertConfig: any = {
    customClass: {
        popup: 'border border-slate-200 bg-white p-6 shadow-lg sm:rounded-lg',
        title: 'flex flex-col space-y-2 text-center sm:text-left text-lg font-semibold',
        htmlContainer: 'duration-200 sweet-alert-content',
        confirmButton: 'sweet-alert-button',
        cancelButton: 'sweet-alert-button sweet-alert-cancel',
        actions: 'flex w-full sweet-alert-actions',
    },
    showClass: {
        popup: 'animate-in fade-in-0 zoom-in-95',
    },
    hideClass: {
        popup: 'animate-out fade-out-0 zoom-out-95',
    },
}

export const sweetAlertConfigNoCancel: any = {
    customClass: {
        popup: 'border border-slate-200 bg-white p-6 shadow-lg sm:rounded-lg',
        title: 'flex flex-col space-y-2 text-center sm:text-left text-lg font-semibold',
        htmlContainer: 'duration-200 sweet-alert-content',
        confirmButton: 'sweet-alert-button',
        actions: 'flex w-full sweet-alert-actions',
    },
    showClass: {
        popup: 'animate-in fade-in-0 zoom-in-95',
    },
    hideClass: {
        popup: 'animate-out fade-out-0 zoom-out-95',
    },
}

export default sweetAlertConfig
