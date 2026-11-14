import AppShell from "./components/AppShell";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <>
      <AppShell user={{nom:"abdellah",role:"admin "}}>
        <LoginForm />
      </AppShell>
    </>
  );
}
