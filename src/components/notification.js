import notifee from "@notifee/react-native"

export const progressNotification = async (event, progress) => {
  const channelId = await notifee.createChannel({
    id: 'uploadProgress',
    name: 'Progress Channel',
  })

  if (event === 'start') {
    await notifee.displayNotification({
      id: '1',
      title: 'Uploading and analyzing swing...',
      android: {
        channelId,
        progress: {
          max: 100,
          current: progress
        }
      }
    })
  }

  if (event === 'update' && progress !== 100) {
    await notifee.displayNotification({
      id: '1',
      title: 'Uploading and analyzing swing...',
      android: {
        channelId,
        progress: {
          max: 100,
          current: progress
        }
      }
    })
  }

  if (event === 'complete') {
    await notifee.displayNotification({
      id: '1',
      title: 'Finished',
      body: progress.message,
      android: {
        channelId
      }
    })
  }
  
}