// 개발환경 분리(로컬 vs 배포모드)
// 환경변수 process.env.NODE_ENV
// 로컬환경에서: devleopment, Deploy(배포)한 후
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    // development라면 module.exports를 prod에서 하는게 아니라 dev.js 파일에서 함
    module.exports = require('./dev');
}