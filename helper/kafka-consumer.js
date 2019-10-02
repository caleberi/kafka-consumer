const KafkaConsumer = require("kafka-node").Consumer;
const Kafka = require("kafka-node");

class KafkaConsumerInterface {
        constructor(host) {
                this.host = host;
        }
        // creates a kafka client
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

                return this.createConsumer(payload, (option = {})).on(
                        "message",
                        msg => {
                                
                        }
                );
        }

        kafkaLogger(payload) {
                if (typeof payload == "object") {
                        return {
                                debug: console.debug.bind(console),
                                info: console.info.bind(console),
                                warn: console.warn.bind(console),
                                error: console.error.bind(console)
                        };
                }

                return {
                        debug: console.debug.bind(console),
                        info: console.info.bind(console),
                        warn: console.warn.bind(console),
                        error: console.error.bind(console)
                };
        }

        logger() {
                kafkaLogging.setLoggerProvider(kafkaLogger());
        }
}

const KafkaConsumerCreate = (host = {}) => {
        return new KafkaConsumerInterface(host);
};

module.exports = KafkaConsumerCreate;
