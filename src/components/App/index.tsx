import React, {useEffect, useRef, useState} from 'react';
import {BryntumScheduler} from 'bryntum-react-shared';
import schedulerConfig from '../../schedulerConfig';
import {DomClassList, SchedulerEventModel} from 'bryntum-schedulerpro/schedulerpro.umd.js';
import {Input, Row, Col} from 'antd';
import {Header} from '../Header';

export const App: React.FC = () => {
    // Type `any` in official examples
    const scheduler: any = useRef(null);
    const [filter, setFilter] = useState<string>('');
    const [highlighting, setHighlighting] = useState<string>('');

    useEffect(() => {
        const eventStore = scheduler.current.schedulerInstance.eventStore;
        eventStore.filter({
            filters: (event: SchedulerEventModel) => event.name.match(new RegExp(filter, 'i')),
            replace: true
        });

    }, [filter])

    useEffect(() => {
        const engine = scheduler.current.schedulerInstance;
        // Type `any` in official examples
        engine.eventStore.forEach((task: any) => {
            const taskClassList = new DomClassList(task.cls),
                matched = taskClassList.contains('b-match');

            if (task.name.toLowerCase().indexOf(highlighting) >= 0) {
                if (!matched) {
                    taskClassList.add('b-match');
                }
            } else if (matched) {
                taskClassList.remove('b-match');
            }
            task.cls = taskClassList.value;
        });
        engine.element.classList[highlighting.length > 0 ? 'add' : 'remove']('b-highlighting');

    }, [highlighting])


    return (
        <>
            <Header>
                <Row justify={'end'} gutter={16}>
                    <Col className="gutter-row">
                        <Input
                            placeholder="Find tasks by name"
                            value={filter}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}/>
                    </Col>
                    <Col className="gutter-row">
                        <Input
                            placeholder="Highlight tasks"
                            value={highlighting}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHighlighting(e.target.value)}/>
                    </Col>
                </Row>
            </Header>
            <BryntumScheduler
                ref={scheduler}
                barMargin={schedulerConfig.barMargin}
                columns={schedulerConfig.columns}
                crudManager={schedulerConfig.crudManager}
                eventBodyTemplate={schedulerConfig.eventBodyTemplate}
                eventColor={schedulerConfig.eventColor}
                eventStyle={schedulerConfig.eventStyle}
                eventRenderer={schedulerConfig.eventRenderer}
                rowHeight={schedulerConfig.rowHeight}
                startDate={schedulerConfig.startDate}
                endDate={schedulerConfig.endDate}
                eventEditFeature={schedulerConfig.eventEditFeature}
                filterBarFeature={schedulerConfig.filterBarFeature}
                stripeFeature={schedulerConfig.stripeFeature}
                timeRangesFeature={schedulerConfig.timeRangesFeature}
                resourceImagePath={schedulerConfig.resourceImagePath}
            />
        </>
    );
}
