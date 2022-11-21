import React from 'react'
import Modal from './Modal'
import Accordion, { AccordionItem } from './Accordion'

const FaqPage = () => {
  const questions = [
    {
      q: 'Example question?',
      a: 'Answer example.',
    },
  ]
  return (
    <Modal>
      <h2>Pytania i odpowiedzi</h2>
      <Accordion>
        {questions.map((item, index) =>
          <AccordionItem title={item.q} key={index}>
            {item.a}
          </AccordionItem>
        )}
      </Accordion>
    </Modal>
  )
}

export default FaqPage
