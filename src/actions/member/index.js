import api from "../../api/index";
import memberConstants from "../../constants/memberConstants";

export const sendEmailToContactPerson = async (data, memberId) => {
  return await api
    .put("/member/send-email/contact-person/" + memberId, data)
    .then((res) => {
      const result = res.data;

      console.log(result);
    })
    .catch((err) => {});
};
