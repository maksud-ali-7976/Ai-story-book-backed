import { password } from "bun";
import moment from "moment";
import { ModuleId } from "src/config/modules";
import Role, { RoleLevel, RoleClass } from "src/models/Role";
import User from "src/models/User";
import { HashPassword } from "src/utils/auth";

export const seeder = async () => {
  (async () => {
    const payload = {
      name: "test user",
      phone: "1234567890",
      email: "testuser123@gmail.com",
      password: HashPassword("user@123"),
    };
    let user = await User.findOne({
      phone: payload.phone,
    });

    if (!user) {
      user = await User.create(payload);
    } else {
      user.phone = payload.phone;
      user.email = payload.email;
      user.password = payload.password;
      user.name = payload.name;
      await user.save();
    }
  })();

  return true;
};
