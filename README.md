# kafka-consumer
An AWS KAfka twitter stream consumming appliction runnng on a cron schedular
## Dependencies
- kafka-node
-  redis
- node-cron

# Note:
  This project is just one of the first layer implementation on twitter to aws kafka-server ETL pipelining
  and is it still expected to scale up.
# _init function
This is a initialization function that takes in the kafka-host config object and parse into the kakfa-interface 
createClient method for further implementation .This  init method is run by the cron sheduler for every 1-5 min which is then written to a log folder
```js
function _init(host){
        var kafka_consumer = consumer(host);
        kafka_consumer.recievePayload(payload);

};
eg :
  _init({
                kafkaHost:
                        "52.19.199.252:9092,52.19.199.252:9093,52.19.199.252:9094"
        });
```
Note : the payload is the consumed data from AWS-Kafka

```js
const payload = [
        {
                topic: "caleb_twitter_stream_topic"
        }
];

```
