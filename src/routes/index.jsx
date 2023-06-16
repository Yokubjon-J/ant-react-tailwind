import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Banner = lazy(() => import("pages/banner"));
const Post = lazy(() => import("pages/post"));
const Registration = lazy(() => import("pages/auth/registration"));
const SignIn = lazy(() => import("pages/auth/signIn"));
const Login = lazy(() => import("pages/auth/login"));
const PostsPageEdit = lazy(() => import('pages/posts-dup/form-edit/index'));//create
const PostUpdate = lazy(() => import("pages/posts-dup/update"));//edit
const PostsPage = lazy(() => import('pages/posts-dup/index'));
const Menu = lazy(() => import("pages/menu/index"));

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/registration",
    element: <Registration />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/banner',
    element: <Banner />,
  },
  {
    path: '/post',
    element: <Post />,
    children:[
      {
        path:'create',
        element: <div>h</div>
      }
    ]
  },
  {
    path: '/pages',
    element: <PostsPage />,
  },
  {
    path: '/pages/update/:id',
    element: <PostUpdate />,
  },
  {
    path: '/menu',
    element: <Menu />,
  },
  {
    path: '/pages/create',
    element: <PostsPageEdit />,
    children:[
      {
        path:'create',
        element: <SignIn />
      }
    ]
  },
];

export { authRoutes, privateRoutes };
