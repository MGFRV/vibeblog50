interface SchemaOrgProps {
  data: Record<string, any>;
}

export default function SchemaOrg({ data }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
