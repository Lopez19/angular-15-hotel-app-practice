export interface Sidebar {
  title: string;
  icon: string;
  submenu: Submenu[];
}

export interface Submenu {
  title: string;
  link: string;
  icon: string;
}
