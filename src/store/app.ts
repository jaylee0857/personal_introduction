export const useAppStore = defineStore("app", () => {
  const state = {
    test: "Hello, World!"
  };
  const linkedin =
    "https://www.linkedin.com/in/%E8%81%96%E5%82%91-%E6%9D%8E-a242b2388/";
  const mail = "oncemeet0857@gmail.com";

  return {
    state,
    linkedin,
    mail
  };
});
