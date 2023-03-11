import { Input } from '../../components/form/Input'
import { Select } from '../../components/form/Select'
import { TextArea } from '../../components/form/TextArea'
import { typeOptions } from '../../utils/options'
import { Changelog } from '../../types/changelog'
import '../../components/form/Form.css'

export const ChangelogForm = (props: { changelog: Changelog; setChangelogFn: Function }) => {
  const { changelog, setChangelogFn } = props

  return (
    <form className="rounded px-8 pt-6 border-2 pb-8 w-full">
      <Select
        params={{
          name: 'type',
          label: 'Type',
          options: typeOptions,
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, type: e.target.value }),
        }}
      />
      <Input
        params={{
          name: 'title',
          label: 'Title',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, title: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: 'problem',
          label: 'Problem',
          placeholder: 'What problem it solves & how painful the problem is?',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, problem: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: 'benefits',
          label: 'Benefits',
          placeholder: 'What problem it solves & how painful the problem is?',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, benefits: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: 'solution',
          label: 'Soltution',
          placeholder: 'How it solves the problem (attach a video from the user’s perspective).',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, solution: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: 'launchStrategy',
          label: 'Go-to-market',
          placeholder: 'When it will be available for everyone?',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, launchStrategy: e.target.value }),
        }}
      />
      <TextArea
        params={{
          name: 'kudos',
          label: 'Kudos',
          placeholder: 'Kudos to...',
          rows: 4,
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, kudos: e.target.value }),
        }}
      />
      <Input
        params={{
          name: 'taskLink',
          label: 'Related Task',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({ ...changelog, taskLink: e.target.value }),
        }}
      />
      <Input
        params={{
          name: 'prLink',
          label: 'Related PR',
          onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) =>
            setChangelogFn({
              ...changelog,
              prs: { ...changelog.prs, 'Related PR': e.target.value },
            }),
        }}
      />
    </form>
  )
}
