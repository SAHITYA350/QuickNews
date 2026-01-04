const themes = [
  "light","dark","cupcake","bumblebee","emerald","corporate","synthwave",
    "retro","cyberpunk","valentine","halloween","garden","forest","aqua"
    ,"pastel","fantasy","wireframe","black","luxury","dracula",
    "cmyk","autumn","business","acid","lemonade","night","coffee",
    "winter","dim","nord","sunset","lofi"
];

const ThemeDropdown = () => {
  return (
    <ul className="menu menu-horizontal rounded-md bg-base-300 shadow-xl max-h-80 overflow-y-auto w-59 mt-5">
      {themes.map((theme) => (
        <li key={theme}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller hidden"
              value={theme}
            />

            <div data-theme={theme} className="flex gap-1">
              <span className="w-3 h-3 rounded bg-primary" />
              <span className="w-3 h-3 rounded bg-secondary" />
              <span className="w-3 h-3 rounded bg-accent" />
              <span className="w-3 h-3 rounded bg-neutral" />
            </div>

            <span className="capitalize">{theme}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default ThemeDropdown;
