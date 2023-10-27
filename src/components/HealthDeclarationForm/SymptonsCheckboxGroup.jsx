import { Checkbox, Row, Col } from 'antd'

const SymptonsCheckboxGroup = ({ value={}, onChange }) => {
    const symptonOptions = [
        { label: 'Cough', value: 'cough' },
        { label: 'Smell and Taste Impairment', value: 'smellAndTasteImpairment' },
        { label: 'Fever', value: 'fever' },
        { label: 'Breathing Difficulties', value: 'breathingDifficulties' },
        { label: 'Body Aches', value: 'bodyAches' },
        { label: 'Head Aches', value: 'headAches' },
        { label: 'Fatigue', value: 'fatigue' },
        { label: 'Sore Throat', value: 'soreThroat' },
        { label: 'Diarrhea', value: 'diarrhea' },
        { label: 'Runny Nose', value: 'runnyNose' },
    ]

    // const handleSymtonsChange = (selectedValues) => {
    //     console.log('handleSymtonsChange', selectedValues)
    // }

    return (
        <Checkbox.Group style={{ minWidth: "630px" }} onChange={onChange}
        >
            <Row align="middle" justify="start" className="symptonsRow">
                {symptonOptions.map(sympton => <Col span={8} key={sympton.value}>
                    <Checkbox value={sympton.value}>{sympton.label}</Checkbox>
                </Col>)}
            </Row>
        </Checkbox.Group>
    )
}


export default SymptonsCheckboxGroup