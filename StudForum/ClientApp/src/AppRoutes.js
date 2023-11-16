import Categories from "./pages/Categories";
import CreateDiscussion from "./pages/CreateDiscussion";
import Discussion from "./pages/Discussion";
import FAQ from "./pages/FAQ";
import Forum from "./pages/Forum";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyDiscussion from "./pages/MyDiscussions";
import Reg from "./pages/Reg";
import Search from "./pages/Search";
import Settings from "./pages/Settings";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: "/reg",
    element: <Reg />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/creatediscussion",
    element: <CreateDiscussion />
  },
  {
    path: "/categories",
    element: <Categories />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/forum",
    element: <Forum />
  },
  {
    path: "/discussion",
    element: <Discussion />
  },
  {
    path: "/mydiscussions",
    element: <MyDiscussion />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/search",
    element: <Search />
  }
];

export default AppRoutes;
