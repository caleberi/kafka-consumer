const consumer = require("./helper/kafka-consumer");
const cron = require('node-cron');
const payload = [
        {
                topic: "caleb_twitter_stream_topic"
        }
];


function _init(host){
        var kafka_consumer = consumer(host);
        kafka_consumer.recievePayload(payload);

};

cron.schedule('*/1-5 * * * *',function(){
        _init({
                kafkaHost:
                        "52.19.199.252:9092,52.19.199.252:9093,52.19.199.252:9094"
        });
});



