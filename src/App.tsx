import { Button } from './components/Button/Button'
import type { ButtonSize, ButtonState, ButtonVariant } from './components/Button/ButtonProps'
import './App.css'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']

const SIZES: ButtonSize[] = ['s', 'm', 'l']

const STATES: { id: ButtonState; title: string }[] = [
  { id: 'default', title: 'default' },
  { id: 'hover', title: ':hover' },
  { id: 'active', title: ':active' },
  { id: 'disabled', title: 'disabled' },
]

function App() {
  return (
    <main className="page">
      <div className="card">
        <table className="sheet">
          <colgroup>
            <col className="colVariant" />
            <col className="colSize" />
            <col className="colState" span={STATES.length} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">variant</th>
              <th scope="col">size</th>
              {STATES.map(({ id, title }) => (
                <th key={id} scope="col">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          {VARIANTS.map((variant) => (
            <tbody key={variant}>
              {SIZES.map((size, index) => (
                <tr key={size}>
                  {index === 0 && (
                    <th scope="rowgroup" rowSpan={SIZES.length}>
                      {variant}
                    </th>
                  )}
                  <td className="size">{size.toUpperCase()}</td>
                  {STATES.map(({ id }) => (
                    <td key={id}>
                      <Button variant={variant} size={size} state={id}>
                        Кнопка
                      </Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </main>
  )
}

export default App
