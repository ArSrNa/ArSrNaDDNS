// Powered by Ar-Sr-Na
/*
Version: 220521
本代码在腾讯云+社区发布原理，同时仅在coding.net开源，其余平台允许folk
但请遵守GPL3.0原则，切勿用于商业用途！
*/

const PublicIp = require('nodejs-publicip');
const tencentcloud = require("tencentcloud-sdk-nodejs-dnspod");
const DnspodClient = tencentcloud.dnspod.v20210323.Client;

new PublicIp()
    .queryPublicIPAddresses()
    .then((result) => {
        changeIP(result.ipv4);
    })
    .catch((err) => {
        console.log(err);
    });


function changeIP(ip){
const clientConfig = {
  credential: {
    secretId: "secretId", //替换成你的腾讯云secretID，可在访问管理获取
    secretKey: "secretKey", //替换成你的腾讯云secretKEY，可在访问管理获取
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "dnspod.tencentcloudapi.com",
    },
  },
};

const client = new DnspodClient(clientConfig);
const params = {
    "Domain": "arirs.cn", //替换成你的主域名
    "SubDomain": "ddns1", //替换成你的解析域名
    "RecordType": "A", //IPv4是A，IPv6是AAAA
    "RecordLine": "默认", //线路类型，默认就好
    "Value": ip,
    "TTL": 600, //TTL，默认600s
    "RecordId": 1123993708  //RecordId通过 DescribeRecordList 这个API获取
  };
client.ModifyRecord(params).then(
  (data) => {
    console.log(data);
    //成功回调
  },
  (err) => {
    console.error("error", err);
  }
);
}