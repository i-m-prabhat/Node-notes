const checkPermission = () =>
{
    if (!('serviceWorker' in navigator))
    {
        throw new Error('Service Worker is not supported in this browser');
    }

    if (!('Notification' in window))
    {
        throw new Error('Notification is not supported in this browser');
    }
}

const registerSW = async () =>
{
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () =>
{
    const permission = await Notification.requestPermission();
    if (permission !== 'granted')
    {
        throw new Error('Permission not granted for Notification');
    }
}

const main = async () =>
{
    checkPermission();
    const reg = await registerSW();
    reg.showNotification('Hello world!');
    // requestNotificationPermission();
}


main();