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
```js
class KafkaConsumerInterface {
        constructor(host) {
                this.host = host;
        }
        // creates a kafka client with specified host
        createClient(host) {
                return new Kafka.KafkaClient(host, {
                        sessionTimeout: 20,
                        spinDelay: 10,
                        retries: 2
                });
        }
        //  return an instance of a kafka_consumer
        createConsumer(payload, option = {}) {
                var client = this.createClient(this.host);
                return new KafkaConsumer(client, payload, option);
        }

        recievePayload(payload, option = {}) {
                console.log(payload);
                          // create consumer with the payload
                return this.createConsumer(payload, (option = {})).on(
                        "message",
                        msg => {
                                var today = new Date();
                                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                var newMsg = JSON.stringify(msg);
                                fs.writeFileSync(
                                        `logs/${msg.topic}_${time}.json`,newMsg,(err)=>{
                                                if(err){
                                                        throw new Error("Writing error");
                                                }
                                        }
                                )
                        }
                );
        }
        
 ```
 
 


