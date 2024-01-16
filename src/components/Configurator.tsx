import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { KolAlert, KolButton, KolDetails, KolForm, KolHeading, KolInputCheckbox, KolLink } from '@public-ui/react';

import { RequirenmentSetup } from '../data/setup';
import configurationService from '../services/configuration';
import { Introduction } from './Introduction';
import { useTitle } from '../hooks/useTitle';

type Error = {
	cb: () => void;
	msg: string;
};

export const Configurator: FC = () => {
	const [errors, setErrors] = React.useState<Error[]>([]);
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [showExplanations, setShowExplanations] = React.useState(true);
	const [showKindHints, setShowKindHints] = React.useState(false);
	const [showPropertyHints, setShowPropertyHints] = React.useState(false);

	const refErrorBox = React.useRef<HTMLKolAlertElement>(null);
	const refFirstErrorLink = React.useRef<HTMLKolLinkElement>(null);
	const refFirstKindOption = React.useRef<HTMLKolInputCheckboxElement>(null);
	const refFirstSolutionProperty = React.useRef<HTMLKolInputCheckboxElement>(null);

	const setup = React.useMemo<RequirenmentSetup>(
		() => new RequirenmentSetup(configurationService.lastKindOptionKeys, configurationService.lastSolutionProperties),
		[],
	);
	useTitle('Standardanforderungskatalog für die Barrierefreiheit | BMI');

	return (
		<>
			<KolDetails _label={t('configurator.explanations')} _open={showExplanations} _on={{ onToggle: (_, o: boolean) => setShowExplanations(o) }}>
				<Introduction />
			</KolDetails>
			<hr />
			<KolHeading _label={t('configurator.headline')} _level={2}></KolHeading>
			<KolForm
				_requiredText={''}
				_on={{
					onSubmit: () => {
						const errors: Error[] = [];
						if (setup.kinds.length > 0 && Object.keys(setup.solutionProperties).length > 0) {
							navigate({
								pathname: '/results',
								search: setup.toQueryParams().toString(),
							});
						} else {
							if (setup.kinds.length === 0) {
								errors.push({
									cb: () => refFirstKindOption.current?.focus(),
									msg: t('configurator.errors.noKind'),
								});
							}
							if (Object.keys(setup.solutionProperties).length === 0) {
								errors.push({
									cb: () => refFirstSolutionProperty.current?.focus(),
									msg: t('configurator.errors.noProperty'),
								});
							}
							const offset = 50;
							setTimeout(() => {
								window.scrollTo({
									behavior: 'smooth',
									left: 0,
									top: (refErrorBox.current?.offsetTop ?? offset) - offset,
								});
								setTimeout(() => {
									refErrorBox.current?.focus();
								}, 500);
							}, 500);
						}
						setErrors(errors);
					},
				}}
			>
				{errors.length > 0 && (
					<KolAlert className="mt-4" ref={refErrorBox} tabIndex={0} _label={t('configurator.errors.headline')} _type="error" _variant="card" _level={3}>
						<p className="m-0">
							{t('configurator.errors.description', {
								label: t('configurator.submit'),
							})}
						</p>
						<ul className="m-0 m-t-2">
							{errors.map((error, index) => (
								<li key={`error-${index}`}>
									<KolLink ref={index === 0 ? refFirstErrorLink : undefined} _href="" _label={error.msg} _on={{ onClick: error.cb }} />
								</li>
							))}
						</ul>
					</KolAlert>
				)}
				<div className="grid gap-4">
					<div className="multiple-choise">
						<KolHeading _label={t('configurator.kind.headline')} _level={3}></KolHeading>
						<KolInputCheckbox
							className="my-2"
							_checked={showKindHints}
							_icon={{
								unchecked: 'codicon codicon-close',
							}}
							_label={t(showKindHints ? 'configurator.showHints.checked' : 'configurator.showHints.unchecked')}
							_on={{ onChange: (_, v: any) => setShowKindHints(v === true) }}
							_value
							_variant="switch"
						/>
						<fieldset className="m-0 p-0">
							<legend className="m-0 px-0 py-2">{t('configurator.kind.hint')}</legend>
							<div className="grid sm:grid-cols-2 gap-4 mt-2 pl-1">
								{Object.entries(configurationService.kindOptions).map(([key, kind], index) => (
									<div key={key}>
										<KolInputCheckbox
											ref={index === 0 ? refFirstKindOption : undefined}
											_on={{ onChange: (_: any, value: unknown) => setup.toggleKind(key, value as boolean) }}
											_checked={setup.kinds.includes(key)}
											_label={kind.label}
											_value={key}
											_hint={showKindHints ? kind.hint : ''}
										/>
									</div>
								))}
							</div>
						</fieldset>
					</div>
					<div className="multiple-choise">
						<KolHeading _label={t('configurator.properties.headline')} _level={3}></KolHeading>
						<KolInputCheckbox
							className="mt-2"
							_checked={showPropertyHints}
							_icon={{
								unchecked: 'codicon codicon-close',
							}}
							_label={t(showPropertyHints ? 'configurator.showHints.checked' : 'configurator.showHints.unchecked')}
							_on={{ onChange: (_, v: any) => setShowPropertyHints(v === true) }}
							_value
							_variant="switch"
						/>
						<fieldset className="m-0 p-0">
							<legend className="m-0 px-0 pt-4">{t('configurator.properties.hint')}</legend>
							<KolHeading _label={t('configurator.properties.functions')} _level={4}></KolHeading>
							<div className="grid sm:grid-cols-2 gap-4 mt-2 pl-1">
								{Object.getOwnPropertyNames(configurationService.solutionProperties)
									.filter((key) => !configurationService.strictSolutionOptions.includes(key))
									.map((key, index) => (
										<div key={key}>
											<KolInputCheckbox
												ref={index === 0 ? refFirstSolutionProperty : undefined}
												_on={{
													onChange: (_event: any, value: unknown) => setup.toggleSolutionProperty(key, value as boolean),
												}}
												_checked={!!setup.solutionProperties[key]}
												_label={configurationService.solutionProperties[key].label}
												_value={key}
												_hint={showPropertyHints ? configurationService.solutionProperties[key].hint : ''}
											/>
										</div>
									))}
							</div>
							<KolHeading _label={t('configurator.properties.additional')} _level={4}></KolHeading>
							<div className="grid sm:grid-cols-2 gap-4 mt-2 pl-1">
								{Object.getOwnPropertyNames(configurationService.solutionProperties)
									.filter((key) => configurationService.strictSolutionOptions.includes(key))
									.map((key) => (
										<div key={key}>
											<KolInputCheckbox
												_on={{
													onChange: (_event: any, value: unknown) => setup.toggleSolutionProperty(key, value as boolean),
												}}
												_checked={!!setup.solutionProperties[key]}
												_label={configurationService.solutionProperties[key].label}
												_value={key}
												_hint={showPropertyHints ? configurationService.solutionProperties[key].hint : ''}
											/>
										</div>
									))}
							</div>
						</fieldset>
					</div>
					<div className="text-center">
						<KolButton className="w-full sm:w-auto" _label={t('configurator.submit')} _type="submit" _variant="primary" />
					</div>
				</div>
			</KolForm>
		</>
	);
};
