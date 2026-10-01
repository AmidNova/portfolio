import { SKILL_ICONS } from "../data/skillIcons";
import { TOOLBOX } from "../data/profile";

describe("SKILL_ICONS", () => {
  // Icon packs drop brands between minor versions (react-icons 5.7 removed SiDbt);
  // this names the missing icon instead of React's "Element type is invalid".
  it.each(Object.entries(SKILL_ICONS))("%s a une icône qui existe", (_name, { Icon }) => {
    expect(typeof Icon).toBe("function");
  });

  it("couvre chaque outil de la boîte à outils", () => {
    const missing = TOOLBOX.map((tool) => tool.name).filter((name) => !SKILL_ICONS[name]);
    expect(missing).toEqual([]);
  });
});
