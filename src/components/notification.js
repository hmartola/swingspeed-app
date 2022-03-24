import notifee from "@notifee/react-native"

export const progressNotification = async (event, progress) => {
  const channelId = await notifee.createChannel({
    id: 'uploadProgress',
    name: 'Progress Channel',
  })

  if (event === 'start') {
    await notifee.displayNotification({
      id: '1',
      title: 'Analyzing swing...',
      android: {
        channelId,
        onlyAlertOnce: true,
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
      title: `Analyzing swing... ${Math.round(progress)}%`,
      android: {
        channelId,
        onlyAlertOnce: true,
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
      body: `${progress.message} m/s`,
      android: {
        channelId
      }
    })
  }
  
}