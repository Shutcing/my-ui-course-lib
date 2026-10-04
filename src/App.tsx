import { useState } from 'react'
import { Button } from './components/Button/Button'
import type { ButtonSize, ButtonState, ButtonVariant } from './components/Button/ButtonProps'
import { DatePicker } from './components/DatePicker/DatePicker'
import type { DatePickerState } from './components/DatePicker/DatePickerProps'
import { formatDate } from './components/DatePicker/dateFormat'
import './App.css'

const VARIANTS: ButtonVariant[] = ['fill', 'outline', 'text']

const SIZES: ButtonSize[] = ['s', 'm', 'l']

const STATES: { id: ButtonState; title: string }[] = [
  { id: 'default', title: 'default' },
  { id: 'hover', title: ':hover' },
  { id: 'active', title: ':active' },
  { id: 'disabled', title: 'disabled' },
]

const PICKER_STATES: { id: DatePickerState; title: string }[] = [
  { id: 'default', title: 'default' },
  { id: 'hover', title: ':hover' },
  { id: 'focus', title: ':focus' },
  { id: 'active', title: ':active' },
  { id: 'disabled', title: 'disabled' },
]

function App() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <main className="page">
      <div className="stack">
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

        <div className="card">
          <h2 className="heading">DatePicker</h2>

          <div className="showcase">
            <section className="section">
              <span className="legend">size</span>
              <div className="row">
                {SIZES.map((size) => (
                  <div key={size} className="cell">
                    <span className="caption">{size.toUpperCase()}</span>
                    <DatePicker size={size} />
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <span className="legend">state</span>
              <div className="states">
                {PICKER_STATES.map(({ id, title }) => (
                  <div key={id} className="stateCell">
                    <span className="caption">{title}</span>
                    <DatePicker size="m" state={id} defaultOpen />
                  </div>
                ))}
              </div>
            </section>

            <section className="section">
              <span className="legend">Базовый пример</span>
              <div className="row">
                <div className="cell">
                  <span className="caption">{date ? formatDate(date) : 'дата не выбрана'}</span>
                  <DatePicker value={date} onChange={setDate} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
