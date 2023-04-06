import { useState } from 'react';
import { FormDataContexts } from '../forms/formDataContext';
import { clusterProp, formBuilderProps, formProp, formProperties } from '../../interfaces/formGenerationInterfaces';
import { FieldWrapperType } from '../forms/formWrappers/fieldWrapper';

export const startSchema = {
    type: 'object',
    properties: [
        {
            className: 'grid grid-cols-2 gap-4',
            children: [
                {
                    className: '',
                    fields: {
                        alertGenerated: {
                            type: 'dateTime',
                            label: 'asdkjasdlk',
                        },
                        postalCode: {
                            type: 'input',
                            label: 'asdsad',
                        },
                    },
                },
                {
                    className: '',
                    fields: {
                        Bingo: {
                            type: 'dateTime',
                            label: 'asdkjasdlk',
                        },
                        Bango: {
                            type: 'input',
                            label: 'asdsad',
                        },
                    },
                },
            ],
        },
        {
            className: 'w-full justify-center flex',
            children: [
                {
                    className:
                        'card w-3/4 justify-center  shadow-[0_2px_8px_0px_rgba(5,34,97,0.1)]',
                    children: [
                        {
                            className: 'card-body',
                            fields: {
                                endStageRenalDiseaseOnAdmission: {
                                    type: 'checkbox',
                                    label: 'asdkjasdlk',
                                },
                                interventionOutsideCarePlan: {
                                    type: 'checkbox',
                                    label: 'asdsad',
                                    children: {
                                        interventionOutsideCarePlanSpecification:
                                            {
                                                type: 'input',
                                                label: 'asdsad',
                                                wrapperClassname:
                                                    'flex pr-8 py-5',
                                            },
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ],
};

export const FormBuilder = ({
    schema,
    data,
}: {
    schema: formBuilderProps;
    data: any;
}) => {
    const [formData, _setFormData] = useState<any>(data);
    const setFormData = (key: string, value: any) => {
        _setFormData({ ...formData, [key]: value });
    };

    const RescursiveChildren = ({ children }: { children: formProp }) => {
        return (
            <>
                {Object.keys(children).map((key, idx) => {
                    let field = children
                        ? children[key]
                        : ({} as formProperties);
                    return (
                        <>
                            <Field key={idx} field={field} identifier={key} />
                            {field.children && (
                                <RescursiveChildren children={field.children} />
                            )}
                        </>
                    );
                })}
            </>
        );
    };

    const RescursiveCluster = ({ children }: { children: clusterProp[] }) => {
        return (
            <>
                {children.map((child, idx) => {
                    console.log('child: ', child);
                    return (
                        <>
                            <div className={child.className} key={idx}>
                                {child.fields &&
                                    Object.keys(child.fields).map(
                                        (key, idx) => {
                                            let field = child.fields
                                                ? child.fields[key]
                                                : ({} as formProperties);
                                            return (
                                                <>
                                                    <Field
                                                        key={idx}
                                                        field={field}
                                                        identifier={key}
                                                    />
                                                    {field.children && (
                                                        <RescursiveChildren
                                                            children={
                                                                field.children
                                                            }
                                                        />
                                                    )}
                                                </>
                                            );
                                        }
                                    )}
                                {child.children && (
                                    <RescursiveCluster
                                        children={child.children}
                                    />
                                )}
                            </div>
                        </>
                    );
                })}
            </>
        );
    };

    const Field = ({
        field,
        identifier,
    }: {
        field: formProperties;
        identifier: string;
    }) => {
        return (
            <FieldWrapperType
                fieldIdentity={identifier}
                isDisabled={field.isDisabled}
                type={field.type}
                ddOptions={field.dropDownOptions}
                wrapperClassName={field.wrapperClassName}
            />
        );
    };

    return (
        <FormDataContexts.Provider
            value={{
                formData: formData,
                setFormData: setFormData,
            }}
        >
            <div className="mx-20">
                {schema.properties.map((cluster, idx) => {
                    return (
                        <div className={cluster.className} key={idx}>
                            {cluster.fields &&
                                Object.keys(cluster.fields).map((key, idx) => {
                                    let field = cluster.fields
                                        ? cluster.fields[key]
                                        : ({} as formProperties);
                                    return (
                                        <>
                                            <Field
                                                key={idx}
                                                field={field}
                                                identifier={key}
                                            />
                                            {field.children && (
                                                <RescursiveChildren
                                                    key={idx + key + 'child'}
                                                    children={field.children}
                                                />
                                            )}
                                        </>
                                    );
                                })}
                            {cluster.children && (
                                <RescursiveCluster
                                    children={cluster.children}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </FormDataContexts.Provider>
    );
};
