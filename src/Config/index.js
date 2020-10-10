const config = {
  useDemoData:true,
  withOutApi: true,
  websocketApi: window.location.host.indexOf('localhost')<0 ? (window.location.origin+"/api").replace(window.location.protocol+"", window.location.protocol === "https:" ? "wss:" : "ws:") : "wss://chatapp.dataforest.tech/api"
}
export default config
