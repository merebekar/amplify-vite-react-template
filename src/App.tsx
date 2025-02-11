import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import SB from './SB';


const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const { user, signOut } = useAuthenticator();
    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        setShowComponent(!showComponent);
    };


  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);


    return (
        <main>
            
          <h1> Hello {user?.signInDetails?.loginId}</h1>

            <div>
                <button onClick={handleClick}>
                    {showComponent ? 'Hide Storage Browser' : 'Show Storage Browser'}
                </button>
                {showComponent && <SB />}
            </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>

              <div>
                  <button onClick={signOut}>Sign out</button>
              </div>
      </div>
      </main>
  );
}

export default App;
