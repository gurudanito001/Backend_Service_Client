export default {
  backendUrl: "https://backend-service-server.vercel.app/", // http://marlayer-env.eba-avawfb3x.us-east-1.elasticbeanstalk.com
  routes: {
    login: "/clusters/login",
    register: "/clusters/register",
    confirmEmail: "/clusters/confirmEmail",
    resendVerificationEmail: "/clusters/resendVerificationLink",
    forgotPassword: "/clusters/resetPassword",
    changePassword: "/clusters/changePassword"
  }
}