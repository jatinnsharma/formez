import amqp from "amqplib";

async function queueNotifications(updates) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "notifications";

  await channel.assertQueue(queue, { durable: true });

  updates.forEach((update) => {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(update)), {
      persistent: true,
    });
  });

  setTimeout(() => {
    channel.close();
    connection.close();
  }, 500);
}

export { queueNotifications };
