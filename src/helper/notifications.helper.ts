import amqp from "amqplib";

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function sendFCMNotification(token, message) {
  const payload = {
    notification: {
      title: "New Exam Update",
      body: message,
    },
  };

  await admin.messaging().sendToDevice(token, payload);
}

async function processNotificationQueue() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "notifications";

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      //   const user = await getUserById(notification.userId);
      //   await sendFCMNotification(user.fcmToken, notification.message);
      channel.ack(msg);
    }
  });
}
