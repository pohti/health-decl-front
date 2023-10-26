import { Checkbox, Row, Col } from 'antd'

const SymptonsCheckboxGroup = () => {
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

    return (
        <Checkbox.Group style={{ minWidth: "630px" }}>
            <Row align="middle" justify="start" className="symptonsRow">
                <Col span={8}>
                    <Checkbox value="cough">Cough</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="smellAndTasteImpairment">Smell and Taste Impairment</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="fever">Fever</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="breathingDifficulties">Breathing Difficulties</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="bodyAches">Body Aches</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="headAches">Head Aches</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="fatigue">Fatigue</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="soreThroat">Sore Throat</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="diarrhea">Diarrhea</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="runnyNose">Runny Nose</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    )
}


export default SymptonsCheckboxGroup